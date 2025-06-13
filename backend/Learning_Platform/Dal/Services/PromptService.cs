using Dal.Api;
using Dal.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Services
{
    public class PromptService : IPrompt
    {
        LearningPlatformContext db;
        public PromptService(LearningPlatformContext db)
        {
            this.db = db;
        }
        public async Task<List<Prompt>> GetAllAsync(int pageNumber, int pageSize, string? filterText)
        {
            var query = db.Prompts.AsQueryable();

            if (!string.IsNullOrEmpty(filterText))
            {
                query = query.Where(p => p.Prompt1.Contains(filterText));
            }

            return await query
                .OrderByDescending(p => p.UserId) 
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }
        public async Task Create(Prompt item)
        {
            await db.AddAsync(item);
            await db.SaveChangesAsync();
        }
        public Task Delete(Prompt item)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Prompt>> Read()
        {
            return await db.Prompts.ToListAsync();
        }

        public async Task UpDate(Prompt item)
        {
            throw new NotImplementedException();
        }
    }
}

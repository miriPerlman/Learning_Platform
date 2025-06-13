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
    public class CategoryService : ICategory
    {
        LearningPlatformContext db;
        public CategoryService(LearningPlatformContext db) { 
            this.db = db;
        }
        public async Task Create(Category item)
        {
            await db.AddAsync(item);
            await  db.SaveChangesAsync();
        }

        public Task Delete(Category item)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Category>> Read()
        {
            return await db.Categories.ToListAsync();
        }

        public async Task UpDate(Category item)
        {
            throw new NotImplementedException();
        }
    }
}

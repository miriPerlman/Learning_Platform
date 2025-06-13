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
    public class SubCategoryServiceL : ISubCategory
    {
        LearningPlatformContext db;
        public SubCategoryServiceL(LearningPlatformContext db)
        {
            this.db = db;
        }
        public async Task Create(SubCategory item)
        {
            await db.AddAsync(item);
            await db.SaveChangesAsync();
        }

        public Task Delete(SubCategory item)
        {
            throw new NotImplementedException();
        }
        public async Task<List<SubCategory>> Read()
        {
            return await db.SubCategories.ToListAsync();
        }
        public async Task UpDate(SubCategory item)
        {
            throw new NotImplementedException();
        }
    }
}

using BL.Api;
using Dal.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal.Models;

namespace BL.Services
{
    public class BlCategoryService:IBLCategory
    {
        ICategory Category;
        public BlCategoryService(IDal dal)
        {
            Category = dal.categories;
        }
        public async Task<List<Category>> GetCategories() {
            var categoriesList =await Category.Read();
            return categoriesList;
        }
        public async Task<Category> GetCategoryById(int id)
        {
            var categories =await Category.Read();
            var foundCategory=categories.FirstOrDefault(c => c.Id == id);
            return foundCategory;
        }
    }
}

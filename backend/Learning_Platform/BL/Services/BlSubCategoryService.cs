using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BL.Api;
using Dal.Api;
using Dal.Models;
using Microsoft.IdentityModel.Tokens;

namespace BL.Services
{
    public class BlSubCategoryService:IBLSubCategory
    {
        ISubCategory subCategory;
        public BlSubCategoryService(IDal dal) {
            subCategory = dal.subCategories;
        }
        public async Task<List<SubCategory>> GetsubCategories(int id)
        {
            var subCategoryList =await subCategory.Read();
            var specificCategory=subCategoryList.Where(subC=>subC.CategoryId==id).ToList();
            if (specificCategory.IsNullOrEmpty()) {
                throw new Exception("ERROR!! this category id is not exist.");
            }
            return specificCategory;
        }
        public async Task<SubCategory> GetSubCategoryById(int id)
        {
            var categories = await subCategory.Read();
            var foundCategory = categories.FirstOrDefault(c => c.Id == id);
            return foundCategory;
        }
    }
}


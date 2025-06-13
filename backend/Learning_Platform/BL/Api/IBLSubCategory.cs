using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Api
{
    public interface IBLSubCategory
    {
        public Task<List<SubCategory>> GetsubCategories(int id);
        public Task<SubCategory> GetSubCategoryById(int id);
    }
}

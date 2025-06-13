using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Api
{
    public interface IBLCategory
    {
        public Task<List<Category>> GetCategories();
        public Task<Category> GetCategoryById(int id);
    }
}

using Dal.Api;
using Dal.Models;
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
        public void Create(SubCategory item)
        {
            db.Add(item);
            db.SaveChanges();
        }

        public void Delete(SubCategory item)
        {
            throw new NotImplementedException();
        }

        public List<SubCategory> Read()
        {
            return db.SubCategories.ToList();
        }

        public void UpDate(SubCategory item)
        {
            throw new NotImplementedException();
        }
    }
}

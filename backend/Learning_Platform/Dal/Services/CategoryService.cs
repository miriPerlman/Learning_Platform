using Dal.Api;
using Dal.Models;
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
        public void Create(Category item)
        {
            db.Add(item);
            db.SaveChanges();
        }

        public void Delete(Category item)
        {
            throw new NotImplementedException();
        }

        public List<Category> Read()
        {
            return db.Categories.ToList();
        }

        public void UpDate(Category item)
        {
            throw new NotImplementedException();
        }
    }
}

using Dal.Api;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Services
{
    public class UserService : IUser
    {
        LearningPlatformContext db;
        public UserService(LearningPlatformContext db) {
               this.db = db;
        }    
        public void Create(User item)
        {
           db.Add(item);
            db.SaveChanges();
        }

        public void Delete(User item)
        {
            throw new NotImplementedException();
        }

        public List<User> Read()
        {
            return db.Users.ToList();
        }

        public void UpDate(User item)
        {
            throw new NotImplementedException();
        }
    }
}

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
    public class UserService : IUser
    {
        LearningPlatformContext db;
        public UserService(LearningPlatformContext db) {
               this.db = db;
        }
        public async Task Create(User item)
        {
            await db.AddAsync(item);
            await db.SaveChangesAsync();
        }

        public Task Delete(User item)
        {
            throw new NotImplementedException();
        }

        public async Task<List<User>> Read()
        {
            return await db.Users.ToListAsync();
        }

        public async Task UpDate(User item)
        {
            throw new NotImplementedException();
        }
    }
}

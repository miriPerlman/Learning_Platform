using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Api
{
    public interface IBLUser
    {
        public Task<User> addUser(User user);
        public Task<User> getUserById(int id);
    }
}

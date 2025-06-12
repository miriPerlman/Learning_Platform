﻿using BL.Api;
using Dal.Api;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Services
{
    public class BlUserService:IBLUser
    {
        IUser user;
        public BlUserService(IDal dal) {
            user = dal.users;
        }
        public User addUser(User u)
        {
            var users = user.Read();
            var foundUser = users.FirstOrDefault(us => us.Id == u.Id);
            if (foundUser != null) {
                throw new Exception("this user is already exist at the system");
            }
            user.Create(u);
            return u;
        }
        public User getUserById(int id)
        {
            var users = user.Read();
            var foundUser=users.FirstOrDefault(u=>u.Id== id);
            return foundUser;
        }
    }
}

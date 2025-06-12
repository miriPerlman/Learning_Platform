﻿using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Api
{
    public interface IBLUser
    {
        public User addUser(User user);
        public User getUserById(int id);
    }
}

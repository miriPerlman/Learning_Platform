﻿using System;
using System.Collections.Generic;

namespace Dal.Models;

public partial class User
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Phone { get; set; } = null!;
}

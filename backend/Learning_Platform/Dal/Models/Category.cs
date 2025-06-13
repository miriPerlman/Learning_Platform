using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Dal.Models;

public partial class Category
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    [JsonIgnore] 
    public virtual ICollection<SubCategory> SubCategories { get; set; } = new List<SubCategory>();
}

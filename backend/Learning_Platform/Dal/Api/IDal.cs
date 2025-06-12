using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Api
{
    public interface IDal
    {
        public IUser users { get; }
        public ICategory categories { get; }
        public ISubCategory subCategories { get; }
        public IPrompt prompts { get; }

  

    }
}


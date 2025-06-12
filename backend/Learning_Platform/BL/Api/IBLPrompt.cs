using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Api
{
    public interface IBLPrompt
    {
        public List<Prompt> getUserPrompts (int id);
    }
}

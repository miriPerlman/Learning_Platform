using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Api
{
    public interface IBLManager
    {
        public IBLCategory? BlCategory { get; }
        public IBLUser? BlUser { get; }
        public IBLSubCategory? BlSubCategory { get; }
        public IBLPrompt? BlPrompt { get; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BL.Api;
using Dal.Api;
using Dal.Models;

namespace BL.Services
{
    public class BlPromptService:IBLPrompt
    {
        IPrompt prompts;
        public BlPromptService(IDal dal) {
            prompts = dal.prompts;
        }
        public List<Prompt> getUserPrompts(int id)
        {
            var allPrompts = prompts.Read();
            return allPrompts.FindAll(p => p.UserId == id);
        }
    }
}

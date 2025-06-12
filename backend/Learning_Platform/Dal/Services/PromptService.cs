using Dal.Api;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Services
{
    public class PromptService : IPrompt
    {
        LearningPlatformContext db;
        public PromptService(LearningPlatformContext db)
        {
            this.db = db;
        }
        public void Create(Prompt item)
        {
            db.Add(item);
            db.SaveChanges();
        }

        public void Delete(Prompt item)
        {
            throw new NotImplementedException();
        }

        public List<Prompt> Read()
        {
            return db.Prompts.ToList();
        }

        public void UpDate(Prompt item)
        {
            throw new NotImplementedException();
        }
    }
}

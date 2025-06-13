using Azure;
using Dal.Models;
using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Api
{
    public interface IBLPrompt
    {
        public Task<List<Dal.Models.Prompt>> getUserPrompts (int id);
        // הוספת הפרמטרים החדשים לממשק
        Task<List<Dal.Models.Prompt>> GetAllAsync(int pageNumber, int pageSize, string? filterText);
        public Task<List<Dal.Models.Prompt>> getAllPromptOrderByCategory ();
        public Task< Dal.Models.Prompt> addPrompt(int user_id,int category_id,int sub_category_id,string prompt);
    }
}

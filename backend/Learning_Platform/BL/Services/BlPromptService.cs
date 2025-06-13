using BL.Api;
using Dal;
using Dal.Api;
using Dal.Models;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;


namespace BL.Services
{
    public class BlPromptService:IBLPrompt
    {
        IBLCategory blCategory;
        IBLSubCategory blSubCategory;
        IPrompt prompts;
        private readonly string? _openAIApiKey;
        private static readonly HttpClient client = new HttpClient();
        public BlPromptService(IDal dal, IConfiguration configuration, IBLCategory blCategory, IBLSubCategory blSubCategory)
        {
            prompts = dal.prompts;
            _openAIApiKey = configuration["OpenAI:ApiKey"];
            this.blCategory = blCategory;
            this.blSubCategory = blSubCategory;
        }
        // העברת הפרמטרים לקריאה לשכבת ה-DAL
        public async Task<List<Prompt>> GetAllAsync(int pageNumber, int pageSize, string? filterText)
        {
            return await prompts.GetAllAsync(pageNumber, pageSize, filterText);
        }
        public async Task<Dal.Models.Prompt> addPrompt(int user_id, int category_id, int sub_category_id, string prompt)
        {
            var allPrompts = await prompts.Read();
            if (allPrompts.Exists(p => p.Prompt1 == prompt))
            {
                return allPrompts.FirstOrDefault((p => p.Prompt1 == prompt));
            }
            string aiResponse;
            var categoryName = await getCategoryName(category_id);
            var subCategoryName = await getSubCategoryName(sub_category_id);
            bool isRelevant = await IsPromptRelevantToCategory(prompt, categoryName, subCategoryName);
            if (!isRelevant)
            {
                aiResponse = "We sorry, The prompt is not related to your selected category.";
            }

            else aiResponse =await GetAIResponse(prompt);

            var newPrompt = new Dal.Models.Prompt
            {
                UserId = user_id,
                CategoryId = category_id,
                SubCategoryId = sub_category_id,
                Prompt1= prompt,
                Response = aiResponse,
                CreatedAt = DateTime.Now
            };
            await prompts.Create(newPrompt);

            // החזרת הפרומפט החדש
            return newPrompt;
        }
        public async Task<List<Prompt>> getUserPrompts(int id)
        {
            var allPrompts = await prompts.Read();
            return allPrompts.FindAll(p => p.UserId == id);
        }
        public async Task<List<Dal.Models.Prompt>> getAllPromptOrderByCategory()
        {
            var allPrompts =await prompts.Read(); 
            return allPrompts.OrderBy(p => p.CategoryId).ToList(); 
        }
        private string GetAIResponseDaeme(string prompt)
        {
            return $"response AI: answer for {prompt}";
        }
        private async Task<string>? GetAIResponse(string prompt)
        {
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _openAIApiKey);

            var requestBody = new
            {
                model = "gpt-3.5-turbo-instruct",
                prompt = prompt,
                max_tokens = 150
            };

            var json = Newtonsoft.Json.JsonConvert.SerializeObject(requestBody);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await client.PostAsync("https://api.openai.com/v1/completions", content);

            if (!response.IsSuccessStatusCode)
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                throw new Exception($"OpenAI API Error: {response.StatusCode} - {errorContent}");
            }

            var responseBody = await response.Content.ReadAsStringAsync();
            dynamic? result = Newtonsoft.Json.JsonConvert.DeserializeObject(responseBody);

            return result.choices[0].text.ToString().Trim();
        }
        private async Task<string> getCategoryName(int categoryID)
        {
            var category = await blCategory.GetCategoryById(categoryID);
            return category.Name;
        }
        private async Task<string> getSubCategoryName(int subCategoryID)
        {
            var subCategory = await blSubCategory.GetSubCategoryById(subCategoryID);
            return subCategory.Name;
        }
        private async Task<bool> IsPromptRelevantToCategory(string prompt, string categoryName, string subCategoryName)
        {
            string relevancePrompt = $"Is the following prompt related to the category '{categoryName}' and sub-category '{subCategoryName}'? Answer only 'yes' or 'no'. Prompt: {prompt}";
            string aiAnswer = await GetAIResponse(relevancePrompt);
            return aiAnswer.Trim().ToLower().StartsWith("yes");
        }

    }
}

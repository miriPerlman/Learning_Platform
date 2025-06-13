using BL.Api;
using Dal.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Learning_Platform.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PromptController : ControllerBase
    {
        IBLPrompt PromptAction;
        public PromptController(IBLManager bLManager)
        {
            PromptAction = bLManager.BlPrompt;
        }
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<Prompt>> GetUserPrompts(int userId)
        {
            var userPrompts = await PromptAction.getUserPrompts(userId);
            return Ok(userPrompts);
        }
        [HttpGet("getAllPrompts")]
        public async Task<ActionResult<IEnumerable<Prompt>>> GetAllPrompts()
        {
            try
            {
                var prompts = await PromptAction.getAllPromptOrderByCategory();
                return Ok(prompts);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Prompt>>> GetAll(int pageNumber = 1, int pageSize = 9, string? filterText = null)
        {
            try
            {
                var prompts = await PromptAction.GetAllAsync(pageNumber, pageSize, filterText);
                return Ok(prompts);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPost("{user_id}/{category_id}/{sub_category_id}/{prompt}")]
        public async Task<ActionResult<Prompt>> addPrompt(int user_id,int category_id,int sub_category_id,string prompt)
        {
            var mewPrompt = await PromptAction.addPrompt(user_id, category_id, sub_category_id, prompt);
            return Ok(mewPrompt);
        }

    }
}

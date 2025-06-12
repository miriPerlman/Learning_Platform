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
            return Ok(PromptAction.getUserPrompts(userId));
        }

    }
}

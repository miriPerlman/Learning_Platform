using BL.Api;
using Dal.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Learning_Platform.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        IBLUser UserAction;
        private readonly string AdminPassword;
        public UserController(IBLManager bLManager, IConfiguration configuration) {
            UserAction = bLManager.BlUser;
            AdminPassword = configuration["AdminPassword"];
        }
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(User user)
        {
            try
            {
                await UserAction.addUser(user);
                return Ok(user);
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("already exist"))
                    return Conflict(new { message = ex.Message });
                return StatusCode(500, new { message = ex.Message });
            }
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user =await UserAction.getUserById(id);
            return Ok(user);
        }


        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
        [HttpGet("check-admin-password/{password}")]
        public IActionResult CheckAdminPassword( string password)
        {
            if (password == AdminPassword)
            {
                return Ok(new { isCorrect=true});
            }
            else
            {
                return Unauthorized(new { isCorrect=false, Message = "Invalid password." });
            }
        }
    }
}

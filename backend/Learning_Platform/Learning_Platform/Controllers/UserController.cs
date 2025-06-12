using BL.Api;
using Dal.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Learning_Platform.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        IBLUser UserAction;
        public UserController(IBLManager bLManager) {
            UserAction = bLManager.BlUser;
        }
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(User user)
        {
            UserAction.addUser(user);
            return Ok(user);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = UserAction.getUserById(id);
            if (user == null) return NotFound("this id is not exist at the system.");
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
    }
}

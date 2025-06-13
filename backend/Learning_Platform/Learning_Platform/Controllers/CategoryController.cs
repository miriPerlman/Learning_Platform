using BL.Api;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Learning_Platform.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        IBLCategory CategoryAction;
        public CategoryController(IBLManager bLManager)
        {
            CategoryAction = bLManager.BlCategory;
        }
        [HttpGet("getAllCategories")]
        public async Task<IActionResult> GetCategories() { 
            var categoryList=await CategoryAction.GetCategories();
            return Ok(categoryList);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoryById(int id)
        {
            var category =await CategoryAction.GetCategoryById(id);
            if (category == null) {
                return NotFound("ERROR!! there is no category with id " + id + ".");
            }
            return Ok(category);
        }

    }
}

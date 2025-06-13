using BL.Api;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Learning_Platform.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubCategoryController : ControllerBase
    {
        IBLSubCategory SubCategoryAction;
        public SubCategoryController(IBLManager bLManager)
        {
            SubCategoryAction = bLManager.BlSubCategory;
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSubCategoriesOfSpecificCategory(int id)
        {
            var subCategoryList =await SubCategoryAction.GetsubCategories(id);
            return Ok(subCategoryList);
        }
    
        [HttpGet("getSubCategory/{id}")]
        public async Task<IActionResult> GetCategoryById(int id)
        {
            var subcategory =await SubCategoryAction.GetSubCategoryById(id);
            if (subcategory == null)
            {
                return NotFound("ERROR!! there is no subCategory with id " + id + ".");
            }
            return Ok(subcategory);
        }

    }
}

using BL.Api;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
    }
}

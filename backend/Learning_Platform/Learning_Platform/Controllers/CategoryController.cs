using BL.Api;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
    }
}

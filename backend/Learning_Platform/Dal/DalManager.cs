using Dal.Api;
using Dal.Models;
using Dal.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Dal
{
    public class DalManager : IDal
    {
        public IUser users { get; set; }

        public ICategory categories { get; set; }

        public ISubCategory subCategories { get; set; }

        public IPrompt prompts { get; set; }

        public DalManager(IConfiguration configuration) {
            ServiceCollection service = new ServiceCollection();
            service.AddSingleton<LearningPlatformContext>();
            service.AddSingleton<ICategory,CategoryService >();
            service.AddSingleton<IUser, UserService>();
            service.AddSingleton<ISubCategory, SubCategoryServiceL>();
            service.AddSingleton<IPrompt, PromptService>();
            service.AddSingleton<IConfiguration>(configuration); 
            ServiceProvider serviceProvider = service.BuildServiceProvider();
            users = serviceProvider.GetService<IUser>();
            categories = serviceProvider.GetService<ICategory>();
            subCategories = serviceProvider.GetService<ISubCategory>();
            prompts = serviceProvider.GetService<IPrompt>();
        }
    }
}

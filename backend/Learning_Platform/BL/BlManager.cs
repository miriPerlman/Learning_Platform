using BL.Api;
using BL.Services;
using Dal;
using Dal.Api;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class BlManager : IBLManager
    {
        public IBLCategory? BlCategory { get; }
        public IBLUser? BlUser{ get; }
        public IBLSubCategory? BlSubCategory{ get; }
        public IBLPrompt? BlPrompt{ get; }


        public BlManager(IConfiguration configuration)
        {
            ServiceCollection services = new ServiceCollection();
            services.AddSingleton<IDal, DalManager>();
            services.AddSingleton<IBLCategory, BlCategoryService>();
            services.AddSingleton<IBLUser, BlUserService>();
            services.AddSingleton<IBLSubCategory, BlSubCategoryService>();
            services.AddSingleton<IBLPrompt, BlPromptService>();
            services.AddSingleton<IConfiguration>(configuration);
            ServiceProvider serviceProvider = services.BuildServiceProvider();
            BlCategory = serviceProvider.GetService<IBLCategory>();
            BlUser = serviceProvider.GetService<IBLUser>();
            BlSubCategory = serviceProvider.GetService<IBLSubCategory>();
            BlPrompt = serviceProvider.GetService<IBLPrompt>();
        }
    }
}
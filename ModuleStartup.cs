using Delta.Infrastructure;
using Delta.Infrastructure.Modules;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Delta.Module.Admin
{
    public class ModuleInitializer : IModuleStartup
    {
        public void ConfigureServices(IServiceCollection services, IConfiguration configuration)
        {
            
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            
        }
    }
}

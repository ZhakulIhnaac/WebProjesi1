using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using AYCCorporate.Configuration;

namespace AYCCorporate.Web.Host.Startup
{
    [DependsOn(
       typeof(AYCCorporateWebCoreModule))]
    public class AYCCorporateWebHostModule: AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public AYCCorporateWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(AYCCorporateWebHostModule).GetAssembly());
        }
    }
}

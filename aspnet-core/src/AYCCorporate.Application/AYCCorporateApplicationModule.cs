using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using AYCCorporate.Authorization;

namespace AYCCorporate
{
    [DependsOn(
        typeof(AYCCorporateCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class AYCCorporateApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<AYCCorporateAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(AYCCorporateApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}

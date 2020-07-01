using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace AYCCorporate.Controllers
{
    public abstract class AYCCorporateControllerBase: AbpController
    {
        protected AYCCorporateControllerBase()
        {
            LocalizationSourceName = AYCCorporateConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}

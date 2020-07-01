using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using AYCCorporate.Configuration.Dto;

namespace AYCCorporate.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : AYCCorporateAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}

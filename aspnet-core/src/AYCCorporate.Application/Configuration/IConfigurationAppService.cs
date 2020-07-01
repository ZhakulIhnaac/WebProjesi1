using System.Threading.Tasks;
using AYCCorporate.Configuration.Dto;

namespace AYCCorporate.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}

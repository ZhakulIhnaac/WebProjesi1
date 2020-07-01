using System.Threading.Tasks;
using Abp.Application.Services;
using AYCCorporate.Sessions.Dto;

namespace AYCCorporate.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}

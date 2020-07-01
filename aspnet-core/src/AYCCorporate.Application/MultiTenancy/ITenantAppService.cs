using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AYCCorporate.MultiTenancy.Dto;

namespace AYCCorporate.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}


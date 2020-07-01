using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AYCCorporate.Roles.Dto;
using AYCCorporate.Users.Dto;

namespace AYCCorporate.Users
{
    public interface IUserAppService : IAsyncCrudAppService<UserDto, long, PagedUserResultRequestDto, CreateUserDto, UserDto>
    {
        Task<ListResultDto<RoleDto>> GetRoles();

        Task ChangeLanguage(ChangeUserLanguageDto input);
    }
}

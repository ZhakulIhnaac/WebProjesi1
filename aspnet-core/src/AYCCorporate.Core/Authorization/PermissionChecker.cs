using Abp.Authorization;
using AYCCorporate.Authorization.Roles;
using AYCCorporate.Authorization.Users;

namespace AYCCorporate.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}

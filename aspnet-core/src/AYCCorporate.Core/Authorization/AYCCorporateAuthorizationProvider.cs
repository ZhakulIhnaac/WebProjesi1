using Abp.Authorization;
using Abp.Localization;
using Abp.MultiTenancy;

namespace AYCCorporate.Authorization
{
    public class AYCCorporateAuthorizationProvider : AuthorizationProvider
    {
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            context.CreatePermission(PermissionNames.Pages_Users, L("Users"));
            context.CreatePermission(PermissionNames.Pages_Roles, L("Roles"));
            context.CreatePermission(PermissionNames.Pages_Firms, L("Firms"));
            context.CreatePermission(PermissionNames.Pages_ContactNotes, L("ContactNotes"));
            context.CreatePermission(PermissionNames.Pages_Contacts, L("Contacts"));
            context.CreatePermission(PermissionNames.Pages_Tenders, L("Tenders"));
            context.CreatePermission(PermissionNames.Pages_OfferCalculator, L("OfferCalculator"));
            context.CreatePermission(PermissionNames.Pages_EmailNotifications, L("EmailNotifications"));
            context.CreatePermission(PermissionNames.Pages_Tenants, L("Tenants"), multiTenancySides: MultiTenancySides.Host);
        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, AYCCorporateConsts.LocalizationSourceName);
        }
    }
}

import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { MenuItem } from '@shared/layout/menu-item';

@Component({
    templateUrl: './sidebar-nav.component.html',
    selector: 'sidebar-nav',
    encapsulation: ViewEncapsulation.None
})
export class SideBarNavComponent extends AppComponentBase {

    menuItems: MenuItem[] = [
        new MenuItem(this.l('HomePage'), '', 'home', '/app/home'),
        new MenuItem(this.l('Firms'), 'Pages.Firms', 'apartment', '/app/firms'),
        new MenuItem(this.l('Contacts'), 'Pages.Contacts', 'contacts', '/app/contacts'),
        new MenuItem(this.l('Tenders'), 'Pages.Tenders', 'folder', '/app/tenders'),
        new MenuItem(this.l('ContactNotes'), 'Pages.ContactNotes', 'assignment', '/app/contact-notes'),
        new MenuItem(this.l('Tenants'), 'Pages.Tenants', 'business', '/app/tenants'),
        new MenuItem(this.l('Users'), 'Pages.Users', 'people', '/app/users'),
        new MenuItem(this.l('EmailNotifications'), 'Pages.EmailNotifications', 'mail', '/app/email-notifications'),
        new MenuItem(this.l('Roles'), 'Pages.Roles', 'local_offer', '/app/roles'),
        new MenuItem(this.l('OfferCalculator'), 'Pages.OfferCalculator', 'euro_symbol', '/app/offer-calculator'),
        new MenuItem(this.l('About'), '', 'info', '/app/about'),
    ];

    constructor(
        injector: Injector
    ) {
        super(injector);
    }

    showMenuItem(menuItem): boolean {
        if (menuItem.permissionName) {
            return this.permission.isGranted(menuItem.permissionName);
        }

        return true;
    }
}

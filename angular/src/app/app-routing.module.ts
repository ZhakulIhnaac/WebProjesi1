import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UsersComponent } from './users/users.component';
import { TenantsComponent } from './tenants/tenants.component';
import { ContactsComponent } from './contacts/contacts.component';
import { RolesComponent } from 'app/roles/roles.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { FirmsComponent } from './firms/firms.component';
import { TendersComponent } from './tenders/tenders.component';
import { ContactNotesComponent } from './contact-notes/contact-note.component';
import { OfferCalculatorComponent } from './offer-calculator/offer-calculator.component';
import { EmailNotificationsComponent } from './email-notifications/email-notifications.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                children: [
                    { path: 'home', component: HomeComponent,  canActivate: [AppRouteGuard] },
                    { path: 'firms', component: FirmsComponent, data: { permission: 'Pages.Firms' }, canActivate: [AppRouteGuard] },
                    { path: 'contacts', component: ContactsComponent, data: { permission: 'Pages.Contacts' }, canActivate: [AppRouteGuard] },
                    { path: 'tenders', component: TendersComponent, data: { permission: 'Pages.Tenders' }, canActivate: [AppRouteGuard] },
                    { path: 'contact-notes', component: ContactNotesComponent, data: { permission: 'Pages.ContactNotes' }, canActivate: [AppRouteGuard] },
                    { path: 'users', component: UsersComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
                    { path: 'roles', component: RolesComponent, data: { permission: 'Pages.Roles' }, canActivate: [AppRouteGuard] },
                    { path: 'email-notifications', component: EmailNotificationsComponent, data: { permission: 'Pages.EmailNotifications' }, canActivate: [AppRouteGuard] },
                    { path: 'offer-calculator', component: OfferCalculatorComponent, data: { permission: 'Pages.OfferCalculator' }, canActivate: [AppRouteGuard] },
                    { path: 'tenants', component: TenantsComponent, data: { permission: 'Pages.Tenants' }, canActivate: [AppRouteGuard] },
                    { path: 'about', component: AboutComponent },
                    { path: 'update-password', component: ChangePasswordComponent }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }

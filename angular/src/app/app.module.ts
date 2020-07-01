import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { ModalModule } from 'ngx-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AbpModule } from '@abp/abp.module';

import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';

import { HomeComponent } from '@app/home/home.component';
import { AboutComponent } from '@app/about/about.component';
import { TopBarComponent } from '@app/layout/topbar.component';
import { TopBarLanguageSwitchComponent } from '@app/layout/topbar-languageswitch.component';
import { SideBarUserAreaComponent } from '@app/layout/sidebar-user-area.component';
import { SideBarNavComponent } from '@app/layout/sidebar-nav.component';
import { SideBarFooterComponent } from '@app/layout/sidebar-footer.component';
import { RightSideBarComponent } from '@app/layout/right-sidebar.component';

// Tenants
import { TenantsComponent } from '@app/tenants/tenants.component';
import { CreateTenantDialogComponent } from './tenants/create-tenant/create-tenant-dialog.component';
import { EditTenantDialogComponent } from './tenants/edit-tenant/edit-tenant-dialog.component';

// Roles
import { RolesComponent } from '@app/roles/roles.component';
import { CreateRoleDialogComponent } from './roles/create-role/create-role-dialog.component';
import { EditRoleDialogComponent } from './roles/edit-role/edit-role-dialog.component';

// Users
import { UsersComponent } from '@app/users/users.component';
import { CreateUserDialogComponent } from '@app/users/create-user/create-user-dialog.component';
import { EditUserDialogComponent } from '@app/users/edit-user/edit-user-dialog.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { ResetPasswordDialogComponent } from './users/reset-password/reset-password.component';

// Contact
import { ContactsComponent } from './contacts/contacts.component';
import { CreateEditContactDialogComponent } from './contacts/create-edit-contact/create-edit-contact-dialog.component';
import { ContactDetailDialogComponent } from './contacts/detail-contact/detail-contact.component';
import { CreateEditContactChannelDialogComponent } from './contacts/create-edit-contact/create-edit-contact-channel/create-edit-contact-channel-dialog.component';

// Firm
import { FirmsComponent } from './firms/firms.component';
import { CreateEditFirmDialogComponent } from './firms/create-edit-firm/create-edit-firm-dialog.component';
import { FirmDetailDialogComponent } from './firms/detail-firm/detail-firm.component';

// Tender
import { CreateEditTenderDialogComponent } from './tenders/create-edit-tender/create-edit-tender-dialog.component';
import { TenderDetailDialogComponent } from './tenders/detail-tender/detail-tender.component';
import { TendersComponent } from './tenders/tenders.component';
import { TenderConsortiumsDialogComponent } from './tenders/consortiums-tender/consortiums-tender.component';
import { CreateEditConsortiumDialogComponent } from './tenders/consortiums-tender/create-edit-consortiums/create-edit-consortiums-dialog.component';
import { ConsortiumDetailDialogComponent } from './tenders/consortiums-tender/detail-consortiums/detail-consortiums.component';
import { TenderNextPhaseDialogComponent } from './tenders/tender-next-phase/tender-next-phase-dialog.component';

// ContactNotes
import { ContactNotesComponent } from './contact-notes/contact-note.component';
import { CreateEditContactNoteDialogComponent } from './contact-notes/create-edit-contact-note/create-edit-contact-note-dialog.component';
import { ContactNoteDetailDialogComponent } from './contact-notes/detail-contact-note/detail-contact-note.component';
import { OfferCalculatorComponent } from './offer-calculator/offer-calculator.component';
import { FirmComparisonDialogComponent } from './firms/compare-firm/compare-firm.component';

// EmailNotifications
import { CreateEditEmailNotificationDialogComponent } from './email-notifications/create-edit-email-notifications/create-edit-email-notifications-dialog.component';
import { EmailNotificationsComponent } from './email-notifications/email-notifications.component';

@NgModule({
    declarations: [

        //Main Components
        AppComponent,
        HomeComponent,
        AboutComponent,
        TopBarComponent,
        TopBarLanguageSwitchComponent,
        SideBarUserAreaComponent,
        SideBarNavComponent,
        SideBarFooterComponent,
        RightSideBarComponent,

        // Tenants
        TenantsComponent,
        CreateTenantDialogComponent,
        EditTenantDialogComponent,

        // Roles
        RolesComponent,
        CreateRoleDialogComponent,
        EditRoleDialogComponent,

        // Users
        UsersComponent,
        CreateUserDialogComponent,
        EditUserDialogComponent,
        ChangePasswordComponent,
        ResetPasswordDialogComponent,

        // Contacts
        ContactsComponent,
        CreateEditContactDialogComponent,
        ContactDetailDialogComponent,
        CreateEditContactChannelDialogComponent,

        // Firms
        FirmsComponent,
        CreateEditFirmDialogComponent,
        FirmDetailDialogComponent,
        FirmComparisonDialogComponent,

        // ContactNotes
        ContactNotesComponent,
        CreateEditContactNoteDialogComponent,
        ContactNoteDetailDialogComponent,

        // Tenders
        TendersComponent,
        CreateEditTenderDialogComponent,
        TenderNextPhaseDialogComponent,
        TenderDetailDialogComponent,
        TenderConsortiumsDialogComponent,
        ConsortiumDetailDialogComponent,
        CreateEditConsortiumDialogComponent,

        // OfferCalculator
        OfferCalculatorComponent,

        // EmailNotification
        EmailNotificationsComponent,
        CreateEditEmailNotificationDialogComponent

    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        ModalModule.forRoot(),
        AbpModule,
        AppRoutingModule,
        ServiceProxyModule,
        SharedModule,
        NgxPaginationModule,
        CommonModule,
        ChartsModule
    ],
    schemas: [NO_ERRORS_SCHEMA],
    providers: [],
    entryComponents: [

        // Tenants
        CreateTenantDialogComponent,
        EditTenantDialogComponent,

        // Roles
        CreateRoleDialogComponent,
        EditRoleDialogComponent,

        // Users
        CreateUserDialogComponent,
        EditUserDialogComponent,
        ResetPasswordDialogComponent,

        // Contacts
        CreateEditContactDialogComponent,
        ContactDetailDialogComponent,
        CreateEditContactChannelDialogComponent,

        // Firms
        CreateEditFirmDialogComponent,
        FirmDetailDialogComponent,
        FirmComparisonDialogComponent,

        // ContactNotes
        CreateEditContactNoteDialogComponent,
        ContactNoteDetailDialogComponent,

        // Tenders
        CreateEditTenderDialogComponent,
        TenderNextPhaseDialogComponent,
        TenderDetailDialogComponent,
        TenderConsortiumsDialogComponent,
        CreateEditConsortiumDialogComponent,
        ConsortiumDetailDialogComponent,

        // OfferCalculator
        OfferCalculatorComponent,

        // EmailNotification
        CreateEditEmailNotificationDialogComponent,
    ]
})
export class AppModule { }

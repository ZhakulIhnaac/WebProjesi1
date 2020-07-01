import { Component, Injector, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { CorporateServiceProxy, EmailNotificationsDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '../../shared/app-component-base';
import { ESearchParamOperator } from '../../shared/AppEnums';
import { CreateEditEmailNotificationDialogComponent } from './create-edit-email-notifications/create-edit-email-notifications-dialog.component';

@Component({
    templateUrl: './email-notifications.component.html',
    animations: [appModuleAnimation()],
    styles: [
        `
          mat-form-field {
            padding: 10px;
          }
        `
    ]
})
export class EmailNotificationsComponent extends AppComponentBase implements OnInit {
    emailNotificationList: EmailNotificationsDto[] = [];
    searchKeyEmailNotificationName: string;

    constructor(
        injector: Injector,
        private _corporateService: CorporateServiceProxy,
        private _dialog: MatDialog
    ) {
        super(injector);
    }

    ngOnInit() {
        this.getEmailNotificationsForTable();
    }

    refresh() {
        this.ngOnInit();
    }

    searchEmailNotification() {
        this.page = 1;
        this.maxResult = 10;
        this.getEmailNotificationsForTable();
    }

    getEmailNotificationsForTable() {

        this.addSearchParamAnd("name", ESearchParamOperator.Include, this.searchKeyEmailNotificationName);

        this._corporateService.getEmailNotificationsForTable(this.maxResult, this.page, this.searchParamList).subscribe(result => {
            this.emailNotificationList = result.itemList;
            this.totalItems = result.totalItemCount;
            this.searchParamList.searchParamAndList.length = 0;
            this.searchParamList.searchParamOrList.length = 0;
            this.pageList = [...Array(Math.ceil(this.totalItems / this.maxResult)).keys()].map(i => i + 1);
        })
    }

    resetSearch() {
        this.searchKeyEmailNotificationName = undefined;
        this.page = 1;
        this.maxResult = 10;
        this.getEmailNotificationsForTable();
    }

    get getPageList() {
        return this.pageList;
    }

    createEditDialog(emailNotificationId?: number): void {
        let createEditDialog;

        createEditDialog = this._dialog.open(CreateEditEmailNotificationDialogComponent, {
            width: "150vh",
            maxHeight: "90vh",
            data: { emailNotificationId }
        });

        createEditDialog.afterClosed().subscribe(result => {
            if (result) {
                this.ngOnInit();
            }
        });
    }

    delete(emailNotification: EmailNotificationsDto): void {
        abp.message.confirm(
            this.l('EmailNotificationDeleteWarningMessage', emailNotification.name), undefined,
            (result: boolean) => {
                if (result) {
                    this._corporateService.deleteEmailNotification(emailNotification.id).subscribe(() => {
                        abp.notify.success(this.l('SuccessfullyDeleted'));
                        this.ngOnInit();
                    });
                }
            }
        );
    }

}

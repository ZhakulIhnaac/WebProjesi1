import { Component, Inject, Injector, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppComponentBase } from '@shared/app-component-base';
import { CorporateServiceProxy, EmailNotificationsWithSubscribersDto, UserDto, UserServiceProxy, EmailNotificationsDto } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';

@Component({
    templateUrl: 'create-edit-email-notifications-dialog.component.html',
    styles: [
        `
      mat-form-field {
        width: 100%;
      }
      mat-checkbox {
        padding-bottom: 5px;
      }
    `
    ]
})
export class CreateEditEmailNotificationDialogComponent extends AppComponentBase implements OnInit {
    saving = false;
    emailNotificationsWithSubscribers: EmailNotificationsWithSubscribersDto = new EmailNotificationsWithSubscribersDto();
    usersList: UserDto[] = [];
    grantedPermissionNames: string[] = [];

    constructor(
        injector: Injector,
        private _userService: UserServiceProxy,
        private _corporateService: CorporateServiceProxy,
        private _dialogRef: MatDialogRef<CreateEditEmailNotificationDialogComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) public _data: { emailNotificationId }
    ) {
        super(injector);
        this.emailNotificationsWithSubscribers.emailNotification = new EmailNotificationsDto;
        this.emailNotificationsWithSubscribers.userList = [];

        if (this._data.emailNotificationId != null) {
            this._corporateService.findEmailNotification(this._data.emailNotificationId).subscribe(result => {
                this.emailNotificationsWithSubscribers = result;
            });
        }
    }

    ngOnInit(): void {
        this._userService.getAll("", true, 0, 10000).subscribe((result) => {
            this.usersList = result.items;
        });
    }

    addSubtractReceiver(userId: number): void {
        if (this.emailNotificationsWithSubscribers.userList.indexOf(userId) >= 0) {
            this.emailNotificationsWithSubscribers.userList.splice(this.emailNotificationsWithSubscribers.userList.indexOf(userId), 1)
        } else {
            this.emailNotificationsWithSubscribers.userList.push(userId);
        }
    }

    isAReceiver(userId: number): boolean {
        return this.emailNotificationsWithSubscribers.userList.includes(userId);
    }

    save(): void {
        this.saving = true;

        if (this._data.emailNotificationId != null) {
            this._corporateService
                .updateEmailNotification(this.emailNotificationsWithSubscribers)
                .pipe(
                    finalize(() => {
                        this.saving = false;
                    })
                )
                .subscribe(() => {
                    this.notify.info(this.l('SavedSuccessfully'));
                    this.close(true);
                });
        } else {
            this._corporateService
                .addEmailNotification(this.emailNotificationsWithSubscribers)
                .pipe(
                    finalize(() => {
                        this.saving = false;
                    })
                )
                .subscribe(result => {
                    if (result) {
                        this.notify.info(this.l('SavedSuccessfully'));
                        this.close(true);
                    } else {
                        this.notify.error(this.l('EMailNotificationAddDuplicationError'));
                    }
                });
        }

    }

    close(result: any): void {
        this._dialogRef.close(result);
    }
}

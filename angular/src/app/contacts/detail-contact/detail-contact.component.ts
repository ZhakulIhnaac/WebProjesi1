import { Component, Inject, Injector, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppComponentBase } from '@shared/app-component-base';
import { ContactsDto, CorporateServiceProxy, ContactChannelDto } from '@shared/service-proxies/service-proxies';

@Component({
    templateUrl: './detail-contact.component.html'
})

export class ContactDetailDialogComponent extends AppComponentBase {

    contact: ContactsDto = new ContactsDto();
    contactChannelList: ContactChannelDto[] = [];

    constructor(
        injector: Injector,
        public _corporateService: CorporateServiceProxy,
        private _dialogRef: MatDialogRef<ContactDetailDialogComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) private _data: { contactId }
    ) {
        super(injector);
        this.findContact();
        this.findContactChannels();
    }

    findContact() {
        this._corporateService.findContact(this._data.contactId).subscribe(result => {
            this.contact = result;
        });
    }

    findContactChannels() {
        this._corporateService.getContactChannelByContactIdForTable(this._data.contactId).subscribe(result => {
            this.contactChannelList = result;
        });
    }

    close(result: any): void {
        this._dialogRef.close(result);
    }
}

import { Component, Inject, Injector, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppComponentBase } from '@shared/app-component-base';
import { ContactNotesDto, CorporateServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
    templateUrl: './detail-contact-note.component.html'
})

export class ContactNoteDetailDialogComponent extends AppComponentBase {

    contactNote: ContactNotesDto = new ContactNotesDto();;

    constructor(
        injector: Injector,
        public _corporateService: CorporateServiceProxy,
        private _dialogRef: MatDialogRef<ContactNoteDetailDialogComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) private _data: { contactNoteId }
    ) {
        super(injector);
        this._corporateService.findContactNote(this._data.contactNoteId).subscribe(result => {
            this.contactNote = result;
            console.log(this.contactNote);
        });
    }

    close(result: any): void {
        this._dialogRef.close(result);
    }
}

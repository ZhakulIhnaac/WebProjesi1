import { Component, Inject, Injector, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { AppComponentBase } from '@shared/app-component-base';
import { ContactNotesDto, ContactsDto, CorporateServiceProxy, DefinitionServiceProxy } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';
import { EMeetingType } from '../../../shared/AppEnums';

@Component({
    templateUrl: './create-edit-contact-note-dialog.component.html',
    styles: [
        `
      mat-form-field {
        width: 100%;
      }
      mat-checkbox {
        padding-bottom: 5px;
      }
    `
    ],
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    ],
})
export class CreateEditContactNoteDialogComponent extends AppComponentBase implements OnInit {
    saving = false;
    contactNote: ContactNotesDto = new ContactNotesDto();
    contactList: ContactsDto[] = [];
    contactListFiltered: ContactsDto[] = [];
    contactSelectBoxFilter: string;
    createEditContactNoteFormGroup: FormGroup;
    get getMeetingTypeEnum() { return EMeetingType; }
    eMeetingType = Object.keys(this.getMeetingTypeEnum);

    constructor(
        private fb: FormBuilder,
        injector: Injector,
        public _corporateService: CorporateServiceProxy,
        public _definitionService: DefinitionServiceProxy,
        private _dialogRef: MatDialogRef<CreateEditContactNoteDialogComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) public _data: { contactNoteId }
    ) {
        super(injector);
        this.createEditContactNoteFormGroup = this.fb.group({
            contactId: new FormControl('', [Validators.required]),
            meetingType: new FormControl('', [Validators.required]),
            meetingDate: new FormControl('', [Validators.required]),
            noteTitle: new FormControl('', [Validators.required, Validators.maxLength(128)]),
            note: new FormControl('', [Validators.required, Validators.maxLength(1024)]),
        })
        if (this._data.contactNoteId != null) {
            this._corporateService.findContactNote(this._data.contactNoteId).subscribe(result => {
                this.contactNote = result;
            });
        }
    }

    ngOnInit(): void {
        this.getContacts();
    }

    filterContact() {
        console.log("sd");
        this.contactListFiltered = this.contactList.filter(x => x.name.toLowerCase().includes(this.contactSelectBoxFilter.toLowerCase()) || x.surname.toLowerCase().includes(this.contactSelectBoxFilter.toLowerCase()));
    }

    getContacts() {
        this._corporateService.getContactForSelectBox().subscribe(result => {
            this.contactList = result;
            this.contactListFiltered = result;
        });
    }

    save(): void {
        this.saving = true;
        this.contactNote.userId = this.appSession.userId;
        if (this._data.contactNoteId != null) {
            this._corporateService
                .updateContactNotes(this.contactNote)
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
                .addContactNotes(this.contactNote)
                .pipe(
                    finalize(() => {
                        this.saving = false;
                    })
                )
                .subscribe(() => {
                    this.notify.info(this.l('SavedSuccessfully'));
                    this.close(true);
                });
        }
        
    }

    close(result: any): void {
        this._dialogRef.close(result);
    }
}

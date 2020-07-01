import { Component, Inject, Injector, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { AppComponentBase } from '@shared/app-component-base';
import { ContactsDto, CountriesDto, CorporateServiceProxy, DefinitionServiceProxy, WorkingAreasDto, ContactAreasDto, ContactNotesDto, ContactExperiencesDto, ContactChannelDto, ContactFirmDto } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';
import { CreateEditContactChannelDialogComponent } from './create-edit-contact-channel/create-edit-contact-channel-dialog.component';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
    templateUrl: './create-edit-contact-dialog.component.html',
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
export class CreateEditContactDialogComponent extends AppComponentBase implements OnInit {
    saving = false;
    contact: ContactsDto = new ContactsDto();
    countryList: CountriesDto[] = [];
    countryListFiltered: CountriesDto[] = [];
    contactChannelList: ContactChannelDto[] = [];
    contactExperienceList: ContactExperiencesDto[] = [];
    contactNoteList: ContactNotesDto[] = [];
    workingAreaList: WorkingAreasDto[] = [];
    workingAreaListToSave: ContactAreasDto[] = [];
    countrySelectBoxFilter: string;
    createEditContactFormGroup: FormGroup;


    constructor(
        private fb: FormBuilder,
        injector: Injector,
        public _corporateService: CorporateServiceProxy,
        public _definitionService: DefinitionServiceProxy,
        private _dialogRef: MatDialogRef<CreateEditContactDialogComponent>,
        private _dialog: MatDialog,
        @Optional() @Inject(MAT_DIALOG_DATA) public _data: { contactId }
    ) {
        super(injector);
        this.createEditContactFormGroup = this.fb.group({
            name: new FormControl('', [Validators.required, Validators.maxLength(64)]),
            surname: new FormControl('', [Validators.required, Validators.maxLength(64)]),
            title: new FormControl('', [Validators.required, Validators.maxLength(32)]),
            country: new FormControl('', [Validators.required]),
            sex: new FormControl('', [Validators.required]),
        })
        if (this._data.contactId != null) {
            this._corporateService.findContact(this._data.contactId).subscribe(result => {
                this.contact = result;
            });
        }
    }

    ngOnInit(): void {
        this.getCountries();
        this.getWorkingAreas();
        this.getContactChannels();
        this.getContactExperiences();
        this.getContactNotes();
    }

    filterCountry() {
        this.countryListFiltered = this.countryList.filter(x => x.countryName.toLowerCase().includes(this.countrySelectBoxFilter.toLowerCase()));
    }

    getCountries() {
        this._definitionService.getCountryForSelectBox().subscribe(result => {
            this.countryList = result;
            this.countryListFiltered = result;
        });
    }

    getWorkingAreas() {
        this._definitionService.getWorkingAreaForSelectBox().subscribe(result => {
            this.workingAreaList = result;
        });
    }

    getContactChannels() {
        this._corporateService.getContactChannelByContactIdForTable(this._data.contactId).subscribe(result => {
            this.contactChannelList = result;
        });
    }

    getContactExperiences() {
        this._corporateService.getContactExperiencesByIdForTable(this._data.contactId).subscribe(result => {
            this.contactExperienceList = result;
        });
    }

    createEditDialog(contactId: string, contactChannelId?: string): void {
        let createEditDialog;

        createEditDialog = this._dialog.open(CreateEditContactChannelDialogComponent, {
            data: { contactId },
            width: "80vh",
            maxHeight: "90vh"
        });

        createEditDialog.afterClosed().subscribe(result => {
            if (result) {
                this.getContactChannels();
            }
        });
    }

    jobChange() {
        console.log("Say Hello");
        //this._corporateService.updateContactFirm(this._data.contactId).subscribe();
    }

    getContactNotes() {
        this._corporateService.getContactNotesByIdForTable(this._data.contactId).subscribe(result => {
            this.contactNoteList = result;
        });
    }

    addRemoveArea(areaId: number, event) {
        if (event.checked) {
            var contactAreaToAdd = new ContactAreasDto();
            contactAreaToAdd.contactId = this._data.contactId;
            contactAreaToAdd.areaId = areaId;
            this.workingAreaListToSave.push(contactAreaToAdd);
        }
        else {
            this.workingAreaListToSave.forEach((item, index) => {
                if (item.areaId === areaId) this.workingAreaListToSave.splice(index, 1);
            });
        }
    }

    save(): void {
        this.saving = true;
        if (this._data.contactId != null) {
            this._corporateService
                .updateContact(this.contact)
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
                .addContact(this.contact)
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

    delete(contactChannelId: string): void {
        abp.message.confirm(
            this.l('ContactChannelDeleteWarningMessage'), undefined,
            (result: boolean) => {
                if (result) {
                    this._corporateService.deleteContactChannel(contactChannelId).subscribe(() => {
                        abp.notify.success(this.l('SuccessfullyDeleted'));
                    });
                }
            }
        );
    }

    close(result: any): void {
        this._dialogRef.close(result);
    }
}

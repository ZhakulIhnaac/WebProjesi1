import { Component, Inject, Injector, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppComponentBase } from '@shared/app-component-base';
import { FirmsDto, CountriesDto, CorporateServiceProxy, DefinitionServiceProxy, ContactChannelDto, ChannelTypeDto } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
    templateUrl: './create-edit-contact-channel-dialog.component.html',
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
export class CreateEditContactChannelDialogComponent extends AppComponentBase {
    saving = false;
    contactChannel: ContactChannelDto = new ContactChannelDto();
    channelTypeList: ChannelTypeDto[] = [];
    createEditContactChannelFormGroup: FormGroup;

    constructor(
        private fb: FormBuilder,
        injector: Injector,
        public _corporateService: CorporateServiceProxy,
        public _definitionService: DefinitionServiceProxy,
        private _dialogRef: MatDialogRef<CreateEditContactChannelDialogComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) public _data: { contactId, contactChannelId }
    ) {
        super(injector);
        this.createEditContactChannelFormGroup = this.fb.group({
            channelType: new FormControl('', [Validators.required]),
            channelContext: new FormControl('', [Validators.required]),
        })
        if (this._data.contactChannelId != null) {
            this._corporateService.findContactChannel(this._data.contactChannelId).subscribe(result => {
                this.contactChannel = result;
            });
        }
        this.contactChannel.contactId = _data.contactId;
        this.getChannelTypes();
    }

    getChannelTypes() {
        this._definitionService.getChannelTypeForSelectBox().subscribe(result => {
            this.channelTypeList = result;
        });
    }

    save(): void {
        this.saving = true;
        if (this._data.contactChannelId != null) {
            this._corporateService
                .updateContactChannel(this.contactChannel)
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
                .addContactChannel(this.contactChannel)
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

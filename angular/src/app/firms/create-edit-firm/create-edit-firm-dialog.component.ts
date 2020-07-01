import { Component, Inject, Injector, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppComponentBase } from '@shared/app-component-base';
import { FirmsDto, CountriesDto, CorporateServiceProxy, DefinitionServiceProxy } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';
import { StatsBase } from 'fs';

@Component({
    templateUrl: './create-edit-firm-dialog.component.html',
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
export class CreateEditFirmDialogComponent extends AppComponentBase implements OnInit {
    saving = false;
    firm: FirmsDto = new FirmsDto();
    countryList: CountriesDto[] = [];
    countryListFiltered: CountriesDto[] = [];
    firmList: FirmsDto[] = [];
    firmListFiltered: FirmsDto[] = [];
    countrySelectBoxFilter: string;
    firmSelectBoxFilter: string;
    originalFirm: FirmsDto;

    constructor(
        injector: Injector,
        public _corporateService: CorporateServiceProxy,
        public _definitionService: DefinitionServiceProxy,
        private _dialogRef: MatDialogRef<CreateEditFirmDialogComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) public _data: { firmId }
    ) {
        super(injector);
        if (this._data.firmId != null) {
            this._corporateService.findFirm(this._data.firmId).subscribe(result => {
                this.firm = result;
            });
            this._corporateService.findFirm(this._data.firmId).subscribe(result => {
                this.firm = result;
            });
        }
    }

    ngOnInit(): void {
        this.getCountries();
        this.getFirms();
    }

    getCountries() {
        this._definitionService.getCountryForSelectBox().subscribe(result => {
            this.countryList = result;
            this.countryListFiltered = result;
        });
    }

    getFirms() {
        this._corporateService.getFirmForSelectBox().subscribe(result => {
            this.firmList = result;
        });
    }

    filterCountry() {
        this.countryListFiltered = this.countryList.filter(x => x.countryName.toLowerCase().includes(this.countrySelectBoxFilter.toLowerCase()));
    }

    filterFirm() {
        if (this.firmSelectBoxFilter.length > 1) {
            this.firmListFiltered = this.firmList.filter(x => x.name.toLowerCase().includes(this.firmSelectBoxFilter.toLowerCase()));
        }
    }

    transferFirm() {
            abp.message.confirm(
                this.l('AreYouSureToTransferFirm', this.firm.name, this.originalFirm.name), undefined,
                (result: boolean) => {
                    if (result) {
                        this._corporateService.transferDuplicatedFirms(this._data.firmId, this.originalFirm.id).subscribe(() => {
                            this.notify.info(this.l('SavedSuccessfully'));
                            this.close(true);
                        });
                    }
                }
            );
    }

    save(): void {
        this.saving = true;
        if (this._data.firmId != null) {
            this._corporateService
                .updateFirm(this.firm)
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
                .addFirm(this.firm)
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
                        this.notify.error(this.l('FirmAddDuplicationError'));
                    }
                });
        }

    }

    close(result: any): void {
        this._dialogRef.close(result);
    }
}

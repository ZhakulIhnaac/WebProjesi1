import { Component, Inject, Injector, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppComponentBase } from '@shared/app-component-base';
import { TendersDto, CountriesDto, CorporateServiceProxy, DefinitionServiceProxy, CurrencyDto, StatusDto, TenderTypeDto, ContractingAuthoritiesDto, FirmConsortiumDto } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { EStatus } from '../../../shared/AppEnums';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
    templateUrl: './create-edit-tender-dialog.component.html',
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

export class CreateEditTenderDialogComponent extends AppComponentBase implements OnInit {
    saving = false;
    tender: TendersDto = new TendersDto();
    consortiumList: FirmConsortiumDto[] = [];
    countryList: CountriesDto[] = [];
    countryListFiltered: CountriesDto[] = [];
    currencyList: CurrencyDto[] = [];
    currencyListFiltered: CurrencyDto[] = [];
    statusList: StatusDto[] = [];
    tenderTypeList: TenderTypeDto[] = [];
    contractingAuthorityList: ContractingAuthoritiesDto[] = [];
    contractingAuthorityListFiltered: ContractingAuthoritiesDto[] = [];
    createEditTenderFormGroup: FormGroup;
    countrySelectBoxFilter: string;
    currencySelectBoxFilter: string;
    contractingAuthoritySelectBoxFilter: string;

    constructor(
        private fb: FormBuilder,
        injector: Injector,
        public _corporateService: CorporateServiceProxy,
        public _definitionService: DefinitionServiceProxy,
        private _dialogRef: MatDialogRef<CreateEditTenderDialogComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) public _data: { tenderId }
    ) {
        super(injector);
        this.createEditTenderFormGroup = this.fb.group({
            publishDate: new FormControl('', [Validators.required]),
            tenderType: new FormControl('', [Validators.required]),
            name: new FormControl('', [Validators.required, Validators.maxLength(256)]),
            duration: new FormControl({ value: '', disabled: this._data.tenderId == null ? true : false }, [Validators.max(999), Validators.min(1)]),
            tenderNumber: new FormControl('', [Validators.required, Validators.maxLength(16)]),
            maximumBudget: new FormControl('', [Validators.required, Validators.max(999999999)]),
            country: new FormControl('', [Validators.required]),
            currency: new FormControl('', [Validators.required]),
            status: new FormControl({ value: '', disabled: this._data.tenderId == null ? true : false }),
            contractingAuthority: new FormControl('', [Validators.required]),
            tenderDescription: new FormControl('', [Validators.required, Validators.maxLength(4096)]),
            tenderCriterias: new FormControl({ value: '', disabled: this._data.tenderId == null ? true : false }, [Validators.maxLength(4096)]),
            openingDate: new FormControl(),
            closingDate: new FormControl(),
            awardingDate: new FormControl(),
            deadline: new FormControl(),
            shortlistDate: new FormControl(),
            cancellationDate: new FormControl(),
            shortlistDeadlineDate: new FormControl(),
            awardedConsortiumId: new FormControl(),
            awardedPrice: new FormControl(),
            awardedTechnicalScore: new FormControl(),
            awardedFinancialScore: new FormControl(),
            awardedTotalScore: new FormControl({ value: '', disabled: true }),
        })
        if (this._data.tenderId != null) {
            this._corporateService.findTender(this._data.tenderId).subscribe(result => {
                this.tender = result;
                this.getConsortiums();
            });
        } else {
            this.tender.statusId = EStatus.Forecast;
        }
    }

    ngOnInit(): void {
        this.getCountries();
        this.getTenderTypes();
        this.getContractingAuthorities();
        this.getCurrency();
        this.getStatus();
    }

    filterCountry() {
        this.countryListFiltered = this.countryList.filter(x => x.countryName.toLowerCase().includes(this.countrySelectBoxFilter.toLowerCase()));
    }

    filterContractingAuthority() {
        this.contractingAuthorityListFiltered = this.contractingAuthorityList.filter(x => x.name.toLowerCase().includes(this.contractingAuthoritySelectBoxFilter.toLowerCase()));
    }

    filterCurrency() {
        this.currencyListFiltered = this.currencyList.filter(x => x.currencyCode.toLowerCase().includes(this.currencySelectBoxFilter.toLowerCase()));
    }

    getCountries() {
        this._definitionService.getCountryForSelectBox().subscribe(result => {
            this.countryList = result;
            this.countryListFiltered = result;
        });
    }

    getConsortiums() {
        this._corporateService.getConsortiumsOfTenderByTenderId(this._data.tenderId).subscribe(result => {
            this.consortiumList = result;
        });
    }

    getTenderTypes() {
        this._definitionService.getTenderTypeForSelectBox().subscribe(result => {
            this.tenderTypeList = result;
        });
    }

    getContractingAuthorities() {
        this._definitionService.getContractingAuthoritiesForSelectBox().subscribe(result => {
            this.contractingAuthorityList = result;
            this.contractingAuthorityListFiltered = result;
        });
    }

    getCurrency() {
        this._definitionService.getCurrencyForSelectBox().subscribe(result => {
            this.currencyList = result;
            this.currencyListFiltered = result;
        });
    }

    getStatus() {
        this._definitionService.getStatusForSelectBox().subscribe(result => {
            this.statusList = result;
        });
    }

    save(): void {
        this.saving = true;

        if (this._data.tenderId != null) {
            this._corporateService
                .updateTender(this.tender)
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
                .addTender(this.tender)
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
                        this.notify.error(this.l('TenderAddDuplicationError'));
                    }

                });
        }

    }

    close(result: any): void {
        this._dialogRef.close(result);
    }
}

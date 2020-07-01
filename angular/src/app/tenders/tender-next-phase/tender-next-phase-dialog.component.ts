import { Component, Inject, Injector, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { AppComponentBase } from '@shared/app-component-base';
import { ConsortiumsDto, CorporateServiceProxy, DefinitionServiceProxy, FirmConsortiumDto, TendersDto } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';
import { EStatus } from '../../../shared/AppEnums';
import { CreateEditConsortiumDialogComponent } from '../consortiums-tender/create-edit-consortiums/create-edit-consortiums-dialog.component';

@Component({
    templateUrl: './tender-next-phase-dialog.component.html',
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

export class TenderNextPhaseDialogComponent extends AppComponentBase {
    saving = false;
    consortium: ConsortiumsDto = new ConsortiumsDto();
    tender: TendersDto = new TendersDto();
    consortiumList: FirmConsortiumDto[] = [];
    get eStatus() { return EStatus; }
    tenderNextPhaseFormGroup: FormGroup;

    constructor(
        private fb: FormBuilder,
        injector: Injector,
        public _corporateService: CorporateServiceProxy,
        public _definitionService: DefinitionServiceProxy,
        private _dialogRef: MatDialogRef<TenderNextPhaseDialogComponent>,
        private _dialog: MatDialog,
        @Optional() @Inject(MAT_DIALOG_DATA) public _data: { tenderId, statusId }
    ) {
        super(injector);

        this.consortium.tenderId = this._data.tenderId;

        switch (this._data.statusId) {
            case EStatus.Forecast:
                this.tenderNextPhaseFormGroup = this.fb.group({
                    duration: new FormControl('', [Validators.required, Validators.max(999), Validators.min(1)]),
                    tenderDescription: new FormControl('', [Validators.required, Validators.maxLength(4096)]),
                    tenderCriterias: new FormControl('', [Validators.required, Validators.maxLength(4096)]),
                    openingDate: new FormControl('', [Validators.required]),
                    deadline: new FormControl('', [Validators.required]),
                })
                break;

            case EStatus.Open:
                this.tenderNextPhaseFormGroup = this.fb.group({
                    closingDate: new FormControl('', [Validators.required]),
                })
                break;

            case EStatus.Closed:
                this.tenderNextPhaseFormGroup = this.fb.group({
                    shortlistDate: new FormControl('', [Validators.required]),
                })
                break;

            case EStatus.Shortlisted:
                this.tenderNextPhaseFormGroup = this.fb.group({
                    awardingDate: new FormControl('', [Validators.required]),
                    awardedConsortiumId: new FormControl('', [Validators.required]),
                    awardedPrice: new FormControl('', [Validators.required]),
                    awardedTechnicalScore: new FormControl('', [Validators.required]),
                    awardedFinancialScore: new FormControl('', [Validators.required]),
                    awardedTotalScore: new FormControl({ value: '', disabled: true }, [Validators.required]),
                })
                this.getConsortiums();
                break;

            default:
                throw new Error(this.l('StructureErrorReviewCodeWarning'));
        }

        this._corporateService.findTender(this._data.tenderId).subscribe(result => {
            this.tender = result;
        })
    }

    save(): void {
        this.saving = true;

        switch (this._data.statusId) {
            case EStatus.Forecast:
                this.tender.statusId = EStatus.Open
                break;

            case EStatus.Open:
                this.tender.statusId = EStatus.Closed
                break;

            case EStatus.Closed:
                this.tender.statusId = EStatus.Shortlisted
                break;

            case EStatus.Shortlisted:
                this.tender.statusId = EStatus.Awarded
                break;

            default:
                throw new Error(this.l('StructureErrorReviewCodeWarning'));
        }

        if (this.tender.awardedTotalScore == null || this.tender.awardedTotalScore == undefined) {
            this.tender.awardedTotalScore = this.tender.awardedTechnicalScore * 0.8 + this.tender.awardedFinancialScore * 0.2
        }

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
    }

    getConsortiums() {
        this._corporateService.getConsortiumsOfTenderByTenderId(this._data.tenderId).subscribe(result => {
            this.consortiumList = result;
        })
    }

    addEditConsortium(tenderId?: number) {
        let addEditConsortiumDialog;
        addEditConsortiumDialog = this._dialog.open(CreateEditConsortiumDialogComponent, {
            width: "150vh",
            maxHeight: "100vh",
            data: { tenderId }
        })

        addEditConsortiumDialog.afterClosed().subscribe(result => {
            if (result) {
                this.getConsortiums();
            }
        })
    }

    close(result: any): void {
        this._dialogRef.close(result);
    }
}

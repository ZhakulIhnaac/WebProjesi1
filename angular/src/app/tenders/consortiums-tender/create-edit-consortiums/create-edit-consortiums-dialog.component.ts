import { Component, Inject, Injector, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { AppComponentBase } from '@shared/app-component-base';
import { ConsortiumsDto, CountriesDto, CorporateServiceProxy, DefinitionServiceProxy, FirmsDto, FirmConsortiumDto, TendersDto } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';
import { EFirmRole, EStatus } from '../../../../shared/AppEnums';
import { EditRoleDialogComponent } from '../../../roles/edit-role/edit-role-dialog.component';

@Component({
    templateUrl: './create-edit-consortiums-dialog.component.html',
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
export class CreateEditConsortiumDialogComponent extends AppComponentBase implements OnInit {
    saving = false;
    consortiumLeader: FirmConsortiumDto;
    firmToAdd: FirmsDto;
    consortium: ConsortiumsDto = new ConsortiumsDto;
    firmInConsortiumList: FirmConsortiumDto[] = [];
    firmList: FirmsDto[] = [];
    firmListFiltered: FirmsDto[] = [];
    tenderList: TendersDto[] = [];
    firmSelectBoxFilter: string;
    get getFirmRoleEnum() { return EFirmRole; }
    eFirmRole = Object.keys(this.getFirmRoleEnum);

    constructor(
        injector: Injector,
        public _corporateService: CorporateServiceProxy,
        public _definitionService: DefinitionServiceProxy,
        private _dialogRef: MatDialogRef<CreateEditConsortiumDialogComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) public _data: { tenderId, consortiumId  }
    ) {
        super(injector);

        if (this._data.consortiumId != null) {
            this._corporateService.findConsortium(this._data.consortiumId).subscribe(result => {
                this.consortium = result;
            });
            this._corporateService.getConsortiumFirms(this._data.consortiumId).subscribe(result => {
                this.firmInConsortiumList = result;
                this.firmInConsortiumList.forEach((item, index) => {
                    if (item.firmRole === EFirmRole.Leader) this.consortiumLeader = item;
                });
            });

        }
        
    }

    filterFirm() {
        if (this.firmSelectBoxFilter.length > 1) {
            this.firmListFiltered = this.firmList.filter(x => x.name.toLowerCase().includes(this.firmSelectBoxFilter.toLowerCase()));
        }
    }

    ngOnInit(): void {
        this.getFirmList();
    }

    getFirmList() {
        this._corporateService.getFirmForSelectBox().subscribe(result => {
            this.firmList = result;
        })
    }

    addFirmToConsortium() {

        if (!this.firmInConsortiumList.map(x => x.firmId).includes(this.firmToAdd.id)) {
            var firmToAddToConsortium: FirmConsortiumDto = new FirmConsortiumDto;
            firmToAddToConsortium.consortiumId = this._data.consortiumId;
            firmToAddToConsortium.firmRole = EFirmRole.Member;
            firmToAddToConsortium.firmId = this.firmToAdd.id;
            firmToAddToConsortium.firm = this.firmToAdd;
            this.firmInConsortiumList.push(firmToAddToConsortium);
        }
        else {
            this.notify.error(this.l('DuplicateFirmInConsortium'));
        }
        
    }

    removeFirmFromConsortium(firm: FirmConsortiumDto) {
        this.firmInConsortiumList.forEach((item, index) => {
            if (item === firm) this.firmInConsortiumList.splice(index, 1);
        });
    }

    changeLeader(firm: FirmConsortiumDto) {
        this.firmInConsortiumList.forEach((item, index) => {
            if (item === firm) item.firmRole = EFirmRole.Leader;
            else item.firmRole = EFirmRole.Member;
        });
    }

    save(): void {
        this.saving = true;
        console.log("submitted");
        this._corporateService
            .addUpdateConsortiumFirms(this._data.tenderId, this._data.consortiumId, this.firmInConsortiumList)
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

    close(result: any): void {
        this._dialogRef.close(result);
    }
}

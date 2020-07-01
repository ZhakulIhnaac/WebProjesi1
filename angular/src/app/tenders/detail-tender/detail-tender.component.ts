import { Component, Inject, Injector, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { AppComponentBase } from '@shared/app-component-base';
import { CorporateServiceProxy, FirmConsortiumDto, TendersDto } from '@shared/service-proxies/service-proxies';
import { EStatus, EStatusColorCodes, ETenderType, EFirmRole } from '../../../shared/AppEnums';
import { FirmDetailDialogComponent } from '../../firms/detail-firm/detail-firm.component';
import { ConsortiumDetailDialogComponent } from '../consortiums-tender/detail-consortiums/detail-consortiums.component';

@Component({
    templateUrl: './detail-tender.component.html'
})

export class TenderDetailDialogComponent extends AppComponentBase {
    tender: TendersDto = new TendersDto();
    participatedConsortiumList: FirmConsortiumDto[] = [];
    awardedFirmsList: FirmConsortiumDto[] = [];
    get getTenderTypeEnum() { return ETenderType; }
    eTenderType = Object.keys(this.getTenderTypeEnum);
    get getStatusEnum() { return EStatus; }
    eStatus = Object.keys(this.getStatusEnum);
    get getStatusColorCodesEnum() { return EStatusColorCodes; }
    eStatusColorCodes = Object.keys(this.getStatusColorCodesEnum);
    get getFirmRoleEnum() { return EFirmRole; }
    eFirmRole = Object.keys(this.getFirmRoleEnum);

    constructor(
        injector: Injector,
        public _corporateService: CorporateServiceProxy,
        private _dialogRef: MatDialogRef<TenderDetailDialogComponent>,
        private _dialog: MatDialog,
        @Optional() @Inject(MAT_DIALOG_DATA) private _data: { tenderId }
    ) {
        super(injector);
        this._corporateService.findTender(this._data.tenderId).subscribe(result => {
            this.tender = result;
            if (this.tender.shortlistDate != null) {
                this.getParticipatedConsortiums(this._data.tenderId);
                if (this.tender.awardingDate != null) {
                    this.getAwardedConsortium(this.tender.awardedConsortiumId);
                }
            }
        });
    }

    getParticipatedConsortiums(tenderId: string) {
        this._corporateService.getConsortiumsOfTenderByTenderId(tenderId).subscribe(result => {
            this.participatedConsortiumList = result;
        })
    }

    getAwardedConsortium(awardedConsortiumId: string) {
        this._corporateService.getFirmsOfConsortiumByConsortiumId(awardedConsortiumId).subscribe(result => {
            this.awardedFirmsList = result;
        })
    }

    createFirmDetailDialog(firmId?: number): void {
        let detailDialog;

        detailDialog = this._dialog.open(FirmDetailDialogComponent, {
            data: { firmId },
            width: "150vh",
            maxHeight: "90vh",
        });

        detailDialog.afterClosed().subscribe();
    }

    createConsortiumDetailDialog(consortiumId?: string): void {
        let detailDialog;

        detailDialog = this._dialog.open(ConsortiumDetailDialogComponent, {
            data: { consortiumId },
            width: "150vh",
            maxHeight: "90vh",
        });

        detailDialog.afterClosed().subscribe();
    }

    close(result: any): void {
        this._dialogRef.close(result);
    }
}

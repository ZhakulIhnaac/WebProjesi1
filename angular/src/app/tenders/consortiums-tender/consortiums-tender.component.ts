import { Component, Inject, Injector, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { AppComponentBase } from '@shared/app-component-base';
import { CorporateServiceProxy, FirmConsortiumDto } from '@shared/service-proxies/service-proxies';
import { EGeneralSettings } from '../../../shared/AppEnums';
import { CreateEditConsortiumDialogComponent } from './create-edit-consortiums/create-edit-consortiums-dialog.component';
import { ConsortiumDetailDialogComponent } from './detail-consortiums/detail-consortiums.component';

@Component({
    templateUrl: './consortiums-tender.component.html'
})

export class TenderConsortiumsDialogComponent extends AppComponentBase {

    firmConsortiumList: FirmConsortiumDto[] = [];
    maxFirmInConsortium: number = EGeneralSettings.MaxFirmInConsortium;

    constructor(
        injector: Injector,
        public _corporateService: CorporateServiceProxy,
        private _dialogRef: MatDialogRef<TenderConsortiumsDialogComponent>,
        private _dialog: MatDialog,
        @Optional() @Inject(MAT_DIALOG_DATA) private _data: { tenderId, tenderName }
    ) {
        super(injector);
        this.getFirmConsortiums();
    }

    getFirmConsortiums() {
        this._corporateService.getConsortiumsOfTenderByTenderId(this._data.tenderId).subscribe(result => {
            this.firmConsortiumList = result;
            console.log(this.firmConsortiumList);
        });
    }

    createEditConsortium(tenderId: string, consortiumId?: string): void {
        let createEditDialog;
        createEditDialog = this._dialog.open(CreateEditConsortiumDialogComponent, {
            width: "150vh",
            maxHeight: "100vh",
            data: { consortiumId, tenderId }
        })

        createEditDialog.afterClosed().subscribe(result => {
            if (result) {
                this.getFirmConsortiums();
            }
        })
    }

    consortiumDetail(consortiumId: number): void {
        let detailDialog;

        detailDialog = this._dialog.open(ConsortiumDetailDialogComponent, {
            data: { consortiumId },
            width: "150vh",
            maxHeight: "90vh",
        });
    }

    close(result: any): void {
        this._dialogRef.close(result);
    }
}

import { ChangeDetectorRef, Component, Inject, Injector, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { AppComponentBase } from '@shared/app-component-base';
import { CorporateServiceProxy, FirmConsortiumDto, OldTendersOfFirmDto, ScoreStatisticsOfFirmAllResultsDto } from '@shared/service-proxies/service-proxies';
import { EFirmRole } from '../../../../shared/AppEnums';
import { FirmDetailDialogComponent } from '../../../firms/detail-firm/detail-firm.component';

@Component({
    templateUrl: './detail-consortiums.component.html'
})

export class ConsortiumDetailDialogComponent extends AppComponentBase implements OnInit {

    oldTendersLoading: boolean = false;
    firmScoreStatisticsLoading: boolean = false;
    firmShortilstStatisticsLoading: boolean = true;
    participatedConsortiumList: FirmConsortiumDto[] = [];
    oldTendersOfFirmList: OldTendersOfFirmDto[] = [];
    scoreStatisticKeys: any;
    scoreStatisticsOverall: ScoreStatisticsOfFirmAllResultsDto = new ScoreStatisticsOfFirmAllResultsDto();
    get getFirmRoleEnum() { return EFirmRole; }
    eFirmRole = Object.keys(this.getFirmRoleEnum);

    constructor(
        injector: Injector,
        private changeDetectorRefs: ChangeDetectorRef,
        public _corporateService: CorporateServiceProxy,
        private _dialog: MatDialog,
        private _dialogRef: MatDialogRef<ConsortiumDetailDialogComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) private _data: { consortiumId }
    ) {
        super(injector);
    }

    ngOnInit() {
        this.findConsortiumMembers();
    }

    findConsortiumMembers() {
        this._corporateService.getFirmsOfConsortiumByConsortiumId(this._data.consortiumId).subscribe(result => {
            this.participatedConsortiumList = result;
        })
    }

    getFirmDetails(firmId?: number): void {
        let detailDialog;

        detailDialog = this._dialog.open(FirmDetailDialogComponent, {
            data: { firmId },
            width: "150vh",
            maxHeight: "90vh",
        });

        detailDialog.afterClosed().subscribe();
    }

    close(result: any): void {
        this._dialogRef.close(result);
    }
}

import { Component, Injector, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { TendersDto, CorporateServiceProxy, TenderTypeDto, StatusDto, DefinitionServiceProxy, SearchParamAnd } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '../../shared/app-component-base';
import { CreateEditTenderDialogComponent } from './create-edit-tender/create-edit-tender-dialog.component';
import { TenderDetailDialogComponent } from './detail-tender/detail-tender.component';
import { ESearchParamOperator, EStatus } from '../../shared/AppEnums';
import { TenderConsortiumsDialogComponent } from './consortiums-tender/consortiums-tender.component';
import { TenderNextPhaseDialogComponent } from './tender-next-phase/tender-next-phase-dialog.component';

@Component({
    templateUrl: './tenders.component.html',
    animations: [appModuleAnimation()],
    styles: [
        `
          mat-form-field {
            padding: 10px;
          }
        `
    ]
})
export class TendersComponent extends AppComponentBase implements OnInit {
    tenderList: TendersDto[] = [];
    statusListSearchParam: SearchParamAnd[] = [];
    typeListSearchParam: SearchParamAnd[] = [];
    searchKeyTenderNumber: string;
    searchKeyTenderTitle: number;
    searchKeyDescription: string;
    searchKeyCriterias: string;
    searchKeyStatusList: number[] = [];
    searchKeyTypeList: number[] = [];
    statusList: StatusDto[] = [];
    tenderTypeList: TenderTypeDto[] = [];
    get eStatus() { return EStatus; }

    constructor(
        injector: Injector,
        private _corporateService: CorporateServiceProxy,
        private _definitionService: DefinitionServiceProxy,
        private _dialog: MatDialog
    ) {
        super(injector);
    }

    ngOnInit() {
        this.getTendersForTable()
        this.getStatusList()
        this.getTenderTypeList()
    }

    refresh() {
        this.ngOnInit()
    }

    resetSearch() {
        this.page = 1;
        this.maxResult = 10;
        this.searchKeyStatusList = [];
        this.searchKeyTypeList = [];
        this.searchKeyTenderTitle = undefined;
        this.searchKeyTenderNumber = undefined;
        this.searchKeyDescription = undefined;
        this.searchKeyCriterias = undefined;
        this.getTendersForTable();
    }

    searchTenders() {
        this.page = 1;
        this.maxResult = 10;
        this.getTendersForTable();
    }

    maxResultChange() {
        this.page = 1;
        this.getTendersForTable()
    }

    getStatusList() {
        this._definitionService.getStatusForSelectBox().subscribe(result => {
            this.statusList = result;
        })
    }

    getTenderTypeList() {
        this._definitionService.getTenderTypeForSelectBox().subscribe(result => {
            this.tenderTypeList = result;
        })
    }

    getTendersForTable() {
        this.searchKeyStatusList.forEach((item) => {
            this.statusListSearchParam.push(new SearchParamAnd({ column: "statusId", operatorType: ESearchParamOperator.Equal, value: item.toString() }))
        })
        this.searchKeyTypeList.forEach((item) => {
            this.typeListSearchParam.push(new SearchParamAnd({ column: "typeId", operatorType: ESearchParamOperator.Equal, value: item.toString() }))
        })
        
        this.addSearchParamAnd("tenderNumber", ESearchParamOperator.Include, this.searchKeyTenderNumber);
        this.addSearchParamAnd("title", ESearchParamOperator.Include, this.searchKeyTenderTitle);
        this.addSearchParamAnd("description", ESearchParamOperator.Include, this.searchKeyDescription);
        this.addSearchParamAnd("criterias", ESearchParamOperator.Include, this.searchKeyCriterias);
        this.addSearchParamOr(this.statusListSearchParam);
        this.addSearchParamOr(this.typeListSearchParam);

        this._corporateService.getTenderForTable(this.maxResult, this.page, this.searchParamList).subscribe(result => {
            this.tenderList = result.itemList;
            this.totalItems = result.totalItemCount;
            this.searchParamList.searchParamAndList.length = 0;
            this.searchParamList.searchParamOrList.length = 0;
            this.statusListSearchParam.length = 0;
            this.typeListSearchParam.length = 0;
            this.pageList = [...Array(Math.ceil(this.totalItems / this.maxResult)).keys()].map(i => i + 1);
        })
    }

    createEditDialog(tenderId?: number): void {
        let createEditDialog;

        createEditDialog = this._dialog.open(CreateEditTenderDialogComponent, {
            width: "150vh",
            maxHeight: "90vh",
            data: { tenderId }
        });

        createEditDialog.afterClosed().subscribe(result => {
            if (result) {
                this.ngOnInit();
            }
        });
    }

    nextPhase(tenderId: number, statusId: number): void {
        let tenderNextPhaseDialog;

        tenderNextPhaseDialog = this._dialog.open(TenderNextPhaseDialogComponent, {
            width: "150vh",
            maxHeight: "90vh",
            data: { tenderId, statusId }
        });

        tenderNextPhaseDialog.afterClosed().subscribe(result => {
            if (result) {
                this.ngOnInit();
            }
        });
    }

    detailDialog(tenderId: number): void {
        let detailDialog;

        detailDialog = this._dialog.open(TenderDetailDialogComponent, {
            data: { tenderId },
            width: "150vh",
            maxHeight: "90vh",
        });

        detailDialog.afterClosed().subscribe(result => {
            if (result) {
                this.ngOnInit();
            }
        });
    }

    showConsortiums(tenderId: number, tenderName: string): void {
        let detailDialog;

        detailDialog = this._dialog.open(TenderConsortiumsDialogComponent, {
            data: { tenderId, tenderName },
            width: "150vh",
            maxHeight: "90vh",
        });

        detailDialog.afterClosed().subscribe(result => {
            if (result) {
                this.ngOnInit();
            }
        });
    }

    delete(tender: TendersDto): void {
        abp.message.confirm(
            this.l('TenderDeleteWarningMessage', tender.title), undefined,
            (result: boolean) => {
                if (result) {
                    this._corporateService.deleteTender(tender.id).subscribe(() => {
                        abp.notify.success(this.l('SuccessfullyDeleted'));
                        this.ngOnInit();
                    });
                }
            }
        );
    }

}

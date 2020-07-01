import { Component, Injector, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { CorporateServiceProxy, FirmsDto, CountriesDto, DefinitionServiceProxy, SearchParamAnd } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '../../shared/app-component-base';
import { CreateEditFirmDialogComponent } from './create-edit-firm/create-edit-firm-dialog.component';
import { ESearchParamOperator } from '../../shared/AppEnums';
import { FirmDetailDialogComponent } from './detail-firm/detail-firm.component';
import { FirmComparisonDialogComponent } from './compare-firm/compare-firm.component';

@Component({
    templateUrl: './firms.component.html',
    animations: [appModuleAnimation()],
    styles: [
        `
          mat-form-field {
            padding: 10px;
          }
        `
    ]
})
export class FirmsComponent extends AppComponentBase implements OnInit {
    firmList: FirmsDto[] = [];
    countryList: CountriesDto[] = [];
    countryListFiltered: CountriesDto[] = [];
    searchKeyFirmName: string;
    searchKeyFirmCountry: number;
    countrySelectBoxFilter: string;

    constructor(
        injector: Injector,
        private _corporateService: CorporateServiceProxy,
        private _definitionService: DefinitionServiceProxy,
        private _dialog: MatDialog
    ) {
        super(injector);
    }

    ngOnInit() {
        this.getFirmsForTable();
        this.getCountries();
    }

    refresh() {
        this.ngOnInit();
    }

    searchFirm() {
        this.page = 1;
        this.maxResult = 10;
        this.getFirmsForTable();
    }

    getFirmsForTable() {
        
        this.addSearchParamAnd("name", ESearchParamOperator.Include, this.searchKeyFirmName);
        this.addSearchParamAnd("countryId", ESearchParamOperator.Equal, this.searchKeyFirmCountry);

        this._corporateService.getFirmForTable(this.maxResult, this.page, this.searchParamList).subscribe(result => {
            this.firmList = result.itemList;
            this.totalItems = result.totalItemCount;
            this.searchParamList.searchParamAndList.length = 0;
            this.searchParamList.searchParamOrList.length = 0;
            this.pageList = [...Array(Math.ceil(this.totalItems / this.maxResult)).keys()].map(i => i + 1);

        })
    }

    resetSearch() {
        this.searchKeyFirmName = undefined;
        this.searchKeyFirmCountry = undefined;
        this.page = 1;
        this.maxResult = 10;
        this.getFirmsForTable();
    }

    getCountries() {
        this._definitionService.getCountryForSelectBox().subscribe(result => {
            this.countryList = result;
            this.countryListFiltered = result;
        });
    }

    get getPageList() {
        return this.pageList;
    }

    filterCountry() {
        this.countryListFiltered = this.countryList.filter(x => x.countryName.toLowerCase().includes(this.countrySelectBoxFilter.toLowerCase()));
    }

    createEditDialog(firmId?: number): void {
        let createEditDialog;

        createEditDialog = this._dialog.open(CreateEditFirmDialogComponent, {
            width: "150vh",
            maxHeight: "90vh",
            data: { firmId }
        });

        createEditDialog.afterClosed().subscribe(result => {
            if (result) {
                this.ngOnInit();
            }
        });
    }

    createDetailDialog(firmId?: number): void {
        let detailDialog;

        detailDialog = this._dialog.open(FirmDetailDialogComponent, {
            data: { firmId },
            width: "150vh",
            maxHeight: "90vh",
        });

        detailDialog.afterClosed().subscribe();
    }

    createComparisonDialog(firmId?: number): void {
        let detailDialog;

        detailDialog = this._dialog.open(FirmComparisonDialogComponent, {
            data: { firmId },
            width: "150vh",
            maxHeight: "90vh",
        });

        detailDialog.afterClosed().subscribe();
    }

    delete(firm: FirmsDto): void {
        abp.message.confirm(
            this.l('FirmDeleteWarningMessage', firm.name), undefined,
            (result: boolean) => {
                if (result) {
                    this._corporateService.deleteFirm(firm.id).subscribe(() => {
                        abp.notify.success(this.l('SuccessfullyDeleted'));
                        this.ngOnInit();
                    });
                }
            }
        );
    }

}

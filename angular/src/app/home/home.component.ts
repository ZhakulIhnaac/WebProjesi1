import { Component, Injector } from '@angular/core';
import { MatDialog } from '@angular/material';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import { ESearchParamOperator, EStatus } from '../../shared/AppEnums';
import { AycTenderDto, CorporateServiceProxy, SearchParamAnd, TendersDto, TenderStatusCountDto, AycPartnerDto } from '../../shared/service-proxies/service-proxies';
import { TenderDetailDialogComponent } from '../tenders/detail-tender/detail-tender.component';
import { ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';

@Component({
    templateUrl: './home.component.html',
    animations: [appModuleAnimation()]
})

export class HomeComponent extends AppComponentBase {

    tenderStatusCounts: TenderStatusCountDto;
    aycTenderList: AycTenderDto[] = [];
    aycPartnerList: AycPartnerDto[] = [];
    forecastedTendersList: TendersDto[] = [];
    openTendersList: TendersDto[] = [];
    forecastedTendersListFiltered: TendersDto[] = [];
    openTendersListFiltered: TendersDto[] = [];
    aycResultCount: any = [];
    showForecastedLimit: number = 0;
    showOpenLimit: number = 0;
    todaysDate: Date = new Date();

    //Comparison against each other
    aycScoreReady: boolean = false;
    aycScoreDataset: ChartDataSets[];
    aycScoreLabel: Label[];

    // Doughnut chart default options
    defaultDoughnutChartType = 'doughnut';
    defaultDoughnutChartColors: Color[] = [
        { borderColor: ['rgba(158, 255, 253, 1)', 'rgba(0, 184, 240, 1)', 'rgba(172, 240, 0, 1)', 'rgba(0, 245, 61, 1)', 'rgba(255, 61, 61, 1)', 'rgba(176, 176, 176, 1)'], backgroundColor: ['rgba(158, 255, 253, 0.6)', 'rgba(0, 184, 240, 0.6)', 'rgba(172, 240, 0, 0.6)', 'rgba(0, 245, 61, 0.6)', 'rgba(255, 61, 61, 0.6)', 'rgba(176, 176, 176, 0.6)'] }
    ];

    // All charts default options
    defaultChartOptions = { responsive: true, aspectRatio: 1.5 };
    defaultChartLegend = true;
    defaultChartPlugins = [];
    defaultChartAspectRatio = 0.5;

    constructor(
        injector: Injector,
        public _corporateService: CorporateServiceProxy,
        public _dialog: MatDialog,
    ) {
        super(injector);;
        this.getTenderStatusCounts();
        this.getAycTenders();
        this.getAycPartners();
        this.getForecastedAndOpenTendersList();
    }

    getTenderStatusCounts() {
        this._corporateService.getTenderStatusCounts().subscribe(result => {
            this.tenderStatusCounts = result;
        })
    }

    sendWarningMail() {
        this._corporateService.checkTenderDeadlineNextWeek().subscribe();
        this._corporateService.checkTenderDeadlinePassed().subscribe();
        this._corporateService.checkTenderDeadlineTomorrow().subscribe();
    }

    getAycTenders() {
        this._corporateService.getAycTenders().subscribe(result => {
            this.aycTenderList = result;
            this.aycScoreCharts(result);
            this.getAycTenderCounts(result);
        })
    }

    getAycPartners() {
        this._corporateService.getAycPartners().subscribe(result => {
            this.aycPartnerList = result;
            console.log(this.todaysDate);
        })
    }

    showMoreForecastedTender(increment: number) {
        this.showForecastedLimit += increment;
        this.forecastedTendersListFiltered = this.forecastedTendersList.slice(0, this.showForecastedLimit);
    }

    showMoreOpenTender(increment: number) {
        this.showOpenLimit += increment;
        this.openTendersListFiltered = this.openTendersList.slice(0, this.showOpenLimit);
    }

    getForecastedAndOpenTendersList() {
        this.addSearchParamOr([
            new SearchParamAnd({ column: "statusId", operatorType: ESearchParamOperator.Equal, value: EStatus.Forecast.toString() }),
            new SearchParamAnd({ column: "statusId", operatorType: ESearchParamOperator.Equal, value: EStatus.Open.toString() })
        ]);
        this._corporateService.getTenderForTable(1000000, 1, this.searchParamList).subscribe(result => {
            this.forecastedTendersList = result.itemList.filter(x => x.statusId == EStatus.Forecast);
            this.openTendersList = result.itemList.filter(x => x.statusId == EStatus.Open).sort((t1, t2) => {
                if (t1.deadline > t2.deadline) {
                    return 1;
                }
                else if (t1.deadline < t2.deadline) {
                    return -1;
                } else {
                    return 0;
                }
            });
            this.showMoreForecastedTender(10);
            this.showMoreOpenTender(10);
        })

    }

    detailDialog(tenderId: number): void {
        let detailDialog;
        detailDialog = this._dialog.open(TenderDetailDialogComponent, {
            data: { tenderId },
            width: "150vh",
            maxHeight: "90vh",
        });
    }

    getAycTenderCounts(result: AycTenderDto[]) {
        this.aycResultCount = [
            { status: 'PreparingToAttend', count: result.filter(x => x.status == 'PreparingToAttend').length },
            { status: 'WaitingForShortlist', count: result.filter(x => x.status == 'WaitingForShortlist').length },
            { status: 'OfferBeingPrepared', count: result.filter(x => x.status == 'OfferBeingPrepared').length },
            { status: 'WaitingForAward', count: result.filter(x => x.status == 'WaitingForAward').length },
            { status: 'AycIsAwarded', count: result.filter(x => x.status == 'AycIsAwarded').length },
            { status: 'AycHasLost', count: result.filter(x => x.status == 'AycHasLost').length },
            { status: 'TenderCancelled', count: result.filter(x => x.status == 'TenderCancelled').length },
        ]
    }

    aycScoreCharts(result: AycTenderDto[]) {

        //Result chart
        this.aycScoreDataset = [{
            data: [
                result.filter(x => x.status == 'PreparingToAttend').length,
                result.filter(x => x.status == 'WaitingForShortlist').length,
                result.filter(x => x.status == 'OfferBeingPrepared').length,
                result.filter(x => x.status == 'WaitingForAward').length,
                result.filter(x => x.status == 'AycIsAwarded').length,
                result.filter(x => x.status == 'AycHasLost').length,
                result.filter(x => x.status == 'TenderCancelled').length
            ]
        }];

        this.aycScoreLabel = [
            this.l('PreparingToAttend'),
            this.l('WaitingForShortlist'),
            this.l('OfferBeingPrepared'),
            this.l('WaitingForAward'),
            this.l('AycIsAwarded'),
            this.l('AycHasLost'),
            this.l('TenderCancelled')
        ];

        this.aycScoreReady = true;

    }

}

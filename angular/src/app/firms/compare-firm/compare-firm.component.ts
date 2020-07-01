import { Component, Inject, Injector, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppComponentBase } from '@shared/app-component-base';
import { CorporateServiceProxy, ScoreStatisticsOfFirmAllResultsDto, ShortlistResultsOfFirmDto, FirmsDto, MutualTendersComparisonDto } from '@shared/service-proxies/service-proxies';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import _ from 'lodash';
import { EFirmRole } from '../../../shared/AppEnums';

@Component({
    templateUrl: './compare-firm.component.html'
})

export class FirmComparisonDialogComponent extends AppComponentBase {

    unannouncedTendersList: MutualTendersComparisonDto[] = [];
    firstFirmAwardedList: MutualTendersComparisonDto[] = [];
    secondFirmAwardedList: MutualTendersComparisonDto[] = [];
    bothLostList: MutualTendersComparisonDto[] = [];
    shortlistResultsOfFirstFirm: ShortlistResultsOfFirmDto = new ShortlistResultsOfFirmDto();
    shortlistResultsOfSecondFirm: ShortlistResultsOfFirmDto = new ShortlistResultsOfFirmDto();
    scoreResultsOfFirstFirm: ScoreStatisticsOfFirmAllResultsDto = new ScoreStatisticsOfFirmAllResultsDto();
    scoreResultsOfSecondFirm: ScoreStatisticsOfFirmAllResultsDto = new ScoreStatisticsOfFirmAllResultsDto();
    firmList: FirmsDto[] = [];
    firmListFiltered: FirmsDto[] = [];
    scoreStatisticKeys: any;
    secondFirmId: string;
    firstFirmName: string;
    secondFirmName: string = this.l("NoFirmSelected");
    scoreStatisticOfSecondFirmReady: boolean = false;
    firmSelectBoxFilter: string;

    //Score statistics with nulls* for first firm
    firstFirmScoreWithNullReady: boolean = false;
    firstFirmScoreWithNullDataset: ChartDataSets[];
    firstFirmScoreWithNullLabel: Label[];

    //Score statistics without nulls* for first firm
    firstFirmScoreWithoutNullReady: boolean = false;
    firstFirmScoreWithoutNullDataset: ChartDataSets[];
    firstFirmScoreWithoutNullLabel: Label[];

    //Shortlist statistics (Role distribution)
    firstFirmShortlistRolesReady: boolean = false;
    firstFirmShortlistRolesDataset: ChartDataSets[];
    firstFirmShortlistRolesLabel: Label[];

    //Shortlist statistics for leader role
    firstFirmShortlistLeaderScoresReady: boolean = false;
    firstFirmShortlistLeaderScoresDataset: ChartDataSets[];
    firstFirmShortlistLeaderScoresLabel: Label[];

    //Shortlist statistics for member role
    firstFirmShortlistMemberScoresReady: boolean = false;
    firstFirmShortlistMemberScoresDataset: ChartDataSets[];
    firstFirmShortlistMemberScoresLabel: Label[];

    //Score statistics with nulls* for second firm
    secondFirmScoreWithNullReady: boolean = false;
    secondFirmScoreWithNullDataset: ChartDataSets[];
    secondFirmScoreWithNullLabel: Label[];

    //Score statistics without nulls* for second firm
    secondFirmScoreWithoutNullReady: boolean = false;
    secondFirmScoreWithoutNullDataset: ChartDataSets[];
    secondFirmScoreWithoutNullLabel: Label[];

    //Shortlist statistics (Role distribution)
    secondFirmShortlistRolesReady: boolean = false;
    secondFirmShortlistRolesDataset: ChartDataSets[];
    secondFirmShortlistRolesLabel: Label[];

    //Shortlist statistics for leader role
    secondFirmShortlistLeaderScoresReady: boolean = false;
    secondFirmShortlistLeaderScoresDataset: ChartDataSets[];
    secondFirmShortlistLeaderScoresLabel: Label[];

    //Shortlist statistics for member role
    secondFirmShortlistMemberScoresReady: boolean = false;
    secondFirmShortlistMemberScoresDataset: ChartDataSets[];
    secondFirmShortlistMemberScoresLabel: Label[];

    //Comparison against each other
    scoresAgainstEachOtherReady: boolean = false;
    scoresAgainstEachOtherDataset: ChartDataSets[];
    scoresAgainstEachOtherLabel: Label[];

    // Bar chart default options
    defaultBarChartType = 'bar';
    defaultBarChartColors: Color[] = [{ borderColor: 'black', backgroundColor: 'rgba(41, 122, 245, 0.4)', }];

    // Doughnut chart default options
    defaultDoughnutChartType = 'doughnut';
    defaultDoughnutChartColors: Color[] = [
        { borderColor: ['rgba(0, 214, 0, 1)', 'rgba(214, 0, 0, 1)', 'rgba(0, 0, 214, 1)', 'rgba(97, 97, 97, 1)'], backgroundColor: ['rgba(0, 214, 0, 0.6)', 'rgba(214, 0, 0, 0.6)', 'rgba(0, 0, 214, 0.6)', 'rgba(97, 97, 97, 0.6)'] }
    ];

    // All charts default options
    defaultChartOptions = { responsive: true, aspectRatio: 1.5 };
    defaultChartLegend = true;
    defaultChartPlugins = [];
    defaultChartAspectRatio = 0.5;

    constructor(
        injector: Injector,
        public _corporateService: CorporateServiceProxy,
        private _dialogRef: MatDialogRef<FirmComparisonDialogComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) private _data: { firmId }
    ) {
        super(injector);
        this._corporateService.getFirmForSelectBox().subscribe(result => {
            this.firmList = result;
        })
        this.getFirstFirmStatistics();
    }

    filterFirm() {
        if (this.firmSelectBoxFilter.length > 1) {
            this.firmListFiltered = this.firmList.filter(x => x.name.toLowerCase().includes(this.firmSelectBoxFilter.toLowerCase()));
        }
    }

    getFirstFirmStatistics() {
        this._corporateService.findFirm(this._data.firmId).subscribe(result => {
            if (result.name.length > 40) {
                this.firstFirmName = result.name.substring(0, 40) + "...";
            } else {
                this.firstFirmName = result.name
            }
        })
        this.getShortlistStatisticsForFirstFirm();
        this.getScoreStatisticsForFirstFirm();
    }

    getShortlistStatisticsForFirstFirm() {
        this._corporateService.getShortlistCountsWithRole(this._data.firmId).subscribe(result => {
            this.shortlistResultsOfFirstFirm = result;
            this.fillDataToFirstFirmShortlistCharts();
        })
    }

    getScoreStatisticsForFirstFirm() {
        this._corporateService.getScoreStatisticsOfFirm(this._data.firmId).subscribe(result => {
            this.scoreResultsOfFirstFirm = result;
            this.fillDataToFirstFirmScoreCharts();
            this.scoreStatisticKeys = Object.keys(this.scoreResultsOfFirstFirm.scoresForTotal);
            this.scoreStatisticKeys.forEach((item, index) => {
                if (item === "id") this.scoreStatisticKeys.splice(index, 1);
            });
        })
    }

    fillDataToFirstFirmScoreCharts() {

        //Score statistics with nulls*
        this.firstFirmScoreWithNullDataset = [{
            label: this.l('Leader'),
            backgroundColor: "red",
            borderColor: "red",
            borderWidth: 1,
            data: [
                this.scoreResultsOfFirstFirm.scoresForLeader.avgTechnicalScoreWithNulls,
                this.scoreResultsOfFirstFirm.scoresForLeader.stDevTechnicalScoreWithNulls,
                this.scoreResultsOfFirstFirm.scoresForLeader.avgFinancialScoreWithNulls,
                this.scoreResultsOfFirstFirm.scoresForLeader.stDevFinancialScoreWithNulls
            ]
        }, {
            label: this.l('Member'),
            backgroundColor: "blue",
            borderColor: "blue",
            borderWidth: 1,
            data: [
                this.scoreResultsOfFirstFirm.scoresForMember.avgTechnicalScoreWithNulls,
                this.scoreResultsOfFirstFirm.scoresForMember.stDevTechnicalScoreWithNulls,
                this.scoreResultsOfFirstFirm.scoresForMember.avgFinancialScoreWithNulls,
                this.scoreResultsOfFirstFirm.scoresForMember.stDevFinancialScoreWithNulls
            ]
        }];

        this.firstFirmScoreWithNullLabel = [
            this.l('avgTechnicalScoreWithNulls'),
            this.l('stDevTechnicalScoreWithNulls'),
            this.l('avgFinancialScoreWithNulls'),
            this.l('stDevFinancialScoreWithNulls')
        ];

        if (!this.firstFirmScoreWithNullDataset[0]['data'].every(_.isNull) && !this.firstFirmScoreWithNullDataset[1]['data'].every(_.isNull)) {
            this.firstFirmScoreWithNullReady = true;
        }

        //Score statistics without nulls*
        this.firstFirmScoreWithoutNullDataset = [{
            label: this.l('Leader'),
            backgroundColor: "red",
            borderColor: "red",
            borderWidth: 1,
            data: [
                this.scoreResultsOfFirstFirm.scoresForLeader.avgTechnicalScoreWithoutNulls,
                this.scoreResultsOfFirstFirm.scoresForLeader.stDevTechnicalScoreWithoutNulls,
                this.scoreResultsOfFirstFirm.scoresForLeader.avgFinancialScoreWithoutNulls,
                this.scoreResultsOfFirstFirm.scoresForLeader.stDevFinancialScoreWithoutNulls
            ]
        }, {
            label: this.l('Member'),
            backgroundColor: "blue",
            borderColor: "blue",
            borderWidth: 1,
            data: [
                this.scoreResultsOfFirstFirm.scoresForMember.avgTechnicalScoreWithoutNulls,
                this.scoreResultsOfFirstFirm.scoresForMember.stDevTechnicalScoreWithoutNulls,
                this.scoreResultsOfFirstFirm.scoresForMember.avgFinancialScoreWithoutNulls,
                this.scoreResultsOfFirstFirm.scoresForMember.stDevFinancialScoreWithoutNulls
            ]
        }];

        this.firstFirmScoreWithoutNullLabel = [
            this.l('avgTechnicalScoreWithoutNulls'),
            this.l('stDevTechnicalScoreWithoutNulls'),
            this.l('avgFinancialScoreWithoutNulls'),
            this.l('stDevFinancialScoreWithoutNulls')];

        if (!this.firstFirmScoreWithoutNullDataset[0]['data'].every(_.isNull) && !this.firstFirmScoreWithoutNullDataset[1]['data'].every(_.isNull)) {
            this.firstFirmScoreWithoutNullReady = true;
        }

    }

    fillDataToFirstFirmShortlistCharts() {

        //Shortlist statistics (Role distribution)
        this.firstFirmShortlistRolesDataset = [{
            data: [
                this.shortlistResultsOfFirstFirm['totalNumberAsLeader'],
                this.shortlistResultsOfFirstFirm['totalNumberAsMember']
            ]
        }];

        this.firstFirmShortlistRolesLabel = [
            this.l('Leader'),
            this.l('Member')];

        if (!this.firstFirmShortlistRolesDataset[0]['data'].every(x => x == 0)) {
            this.firstFirmShortlistRolesReady = true;
        }

        //Shortlist statistics for leader role
        this.firstFirmShortlistLeaderScoresDataset = [{
            data: [
                this.shortlistResultsOfFirstFirm['totalAwardAsLeader'],
                this.shortlistResultsOfFirstFirm['totalLostAsLeader'],
                this.shortlistResultsOfFirstFirm['totalUnannouncedAsLeader'],
                this.shortlistResultsOfFirstFirm['totalCancelledAsLeader']
            ]
        }];

        this.firstFirmShortlistLeaderScoresLabel = [
            this.l('Won'),
            this.l('Lost'),
            this.l('Unannounced'),
            this.l('Cancelled')];

        if (!this.firstFirmShortlistLeaderScoresDataset[0]['data'].every(x => x == 0)) {
            this.firstFirmShortlistLeaderScoresReady = true;
        }

        //Shortlist statistics for member role
        this.firstFirmShortlistMemberScoresDataset = [{
            data: [
                this.shortlistResultsOfFirstFirm['totalAwardAsMember'],
                this.shortlistResultsOfFirstFirm['totalLostAsMember'],
                this.shortlistResultsOfFirstFirm['totalUnannouncedAsMember'],
                this.shortlistResultsOfFirstFirm['totalCancelledAsMember']
            ]
        }];

        this.firstFirmShortlistMemberScoresLabel = [
            this.l('Won'),
            this.l('Lost'),
            this.l('Unannounced'),
            this.l('Cancelled')];

        if (!this.firstFirmShortlistMemberScoresDataset[0]['data'].every(x => x == 0)) {
            this.firstFirmShortlistMemberScoresReady = true;
        }

    }

    getSecondFirmStatistics() {
        this._corporateService.findFirm(this.secondFirmId).subscribe(result => {
            if (result.name.length > 40) {
                this.secondFirmName = result.name.substring(0, 40) + "...";
            } else {
                this.secondFirmName = result.name
            }
        })
        this.getShortlistStatisticsForSecondFirm(this.secondFirmId);
        this.getScoreStatisticsForSecondFirm(this.secondFirmId);
        this.getMutualTenders(this._data.firmId, this.secondFirmId);
    }

    getShortlistStatisticsForSecondFirm(firmId: string) {
        this._corporateService.getShortlistCountsWithRole(firmId).subscribe(result => {
            this.shortlistResultsOfSecondFirm = result;
            this.fillDataToSecondFirmShortlistCharts();
        })
    }

    getScoreStatisticsForSecondFirm(firmId: string) {
        this._corporateService.getScoreStatisticsOfFirm(firmId).subscribe(result => {
            this.scoreResultsOfSecondFirm = result;
            this.scoreStatisticOfSecondFirmReady = true;
            this.fillDataToSecondFirmScoreCharts();
            this.fillDataToComparisonCharts();
        })
    }

    getMutualTenders(firstFirmId: string, secondFirmId: string) {
        this._corporateService.getMutualTendersOfTwoFirms(firstFirmId, secondFirmId).subscribe(result => {
            this.unannouncedTendersList = result.unannouncedTenders;
            this.firstFirmAwardedList = result.firstFirmAwardedTenders;
            this.secondFirmAwardedList = result.secondFirmAwardedTenders;
            this.bothLostList = result.bothLostTenders;
        })
    }

    fillDataToSecondFirmShortlistCharts() {

        //Shortlist statistics (Role distribution)
        this.secondFirmShortlistRolesDataset = [{
            data: [
                this.shortlistResultsOfSecondFirm['totalNumberAsLeader'],
                this.shortlistResultsOfSecondFirm['totalNumberAsMember']
            ]
        }];

        this.secondFirmShortlistRolesLabel = [
            this.l('Leader'),
            this.l('Member')];

        if (!this.secondFirmShortlistRolesDataset[0]['data'].every(x => x == 0)) {
            this.secondFirmShortlistRolesReady = true;
        }

        //Shortlist statistics for leader role
        this.secondFirmShortlistLeaderScoresDataset = [{
            data: [
                this.shortlistResultsOfSecondFirm['totalAwardAsLeader'],
                this.shortlistResultsOfSecondFirm['totalLostAsLeader'],
                this.shortlistResultsOfSecondFirm['totalUnannouncedAsLeader'],
                this.shortlistResultsOfSecondFirm['totalCancelledAsLeader']
            ]
        }];

        this.secondFirmShortlistLeaderScoresLabel = [
            this.l('Won'),
            this.l('Lost'),
            this.l('Unannounced'),
            this.l('Cancelled')];

        if (!this.secondFirmShortlistLeaderScoresDataset[0]['data'].every(x => x == 0)) {
            this.secondFirmShortlistLeaderScoresReady = true;
        }

        //Shortlist statistics for member role
        this.secondFirmShortlistMemberScoresDataset = [{
            data: [
                this.shortlistResultsOfSecondFirm['totalAwardAsMember'],
                this.shortlistResultsOfSecondFirm['totalLostAsMember'],
                this.shortlistResultsOfSecondFirm['totalUnannouncedAsMember'],
                this.shortlistResultsOfSecondFirm['totalCancelledAsMember']
            ]
        }];

        this.secondFirmShortlistMemberScoresLabel = [
            this.l('Won'),
            this.l('Lost'),
            this.l('Unannounced'),
            this.l('Cancelled')];

        if (!this.secondFirmShortlistMemberScoresDataset[0]['data'].every(x => x == 0)) {
            this.secondFirmShortlistMemberScoresReady = true;
        }

    }

    fillDataToSecondFirmScoreCharts() {

        console.log(this.scoreResultsOfSecondFirm);
        //Score statistics with nulls*
        this.secondFirmScoreWithNullDataset = [{
            label: this.l('Leader'),
            backgroundColor: "red",
            borderColor: "red",
            borderWidth: 1,
            data: [
                this.scoreResultsOfSecondFirm.scoresForLeader.avgTechnicalScoreWithNulls,
                this.scoreResultsOfSecondFirm.scoresForLeader.stDevTechnicalScoreWithNulls,
                this.scoreResultsOfSecondFirm.scoresForLeader.avgFinancialScoreWithNulls,
                this.scoreResultsOfSecondFirm.scoresForLeader.stDevFinancialScoreWithNulls
            ]
        }, {
            label: this.l('Member'),
            backgroundColor: "blue",
            borderColor: "blue",
            borderWidth: 1,
            data: [
                this.scoreResultsOfSecondFirm.scoresForMember.avgTechnicalScoreWithNulls,
                this.scoreResultsOfSecondFirm.scoresForMember.stDevTechnicalScoreWithNulls,
                this.scoreResultsOfSecondFirm.scoresForMember.avgFinancialScoreWithNulls,
                this.scoreResultsOfSecondFirm.scoresForMember.stDevFinancialScoreWithNulls
            ]
        }];

        this.secondFirmScoreWithNullLabel = [
            this.l('avgTechnicalScoreWithNulls'),
            this.l('stDevTechnicalScoreWithNulls'),
            this.l('avgFinancialScoreWithNulls'),
            this.l('stDevFinancialScoreWithNulls')
        ];

        if (!this.secondFirmScoreWithNullDataset[0]['data'].every(_.isNull) && !this.secondFirmScoreWithNullDataset[1]['data'].every(_.isNull)) {
            console.log("HEre");
            this.secondFirmScoreWithNullReady = true;
        }

        //Score statistics without nulls*
        this.secondFirmScoreWithoutNullDataset = [{
            label: this.l('Leader'),
            backgroundColor: "red",
            borderColor: "red",
            borderWidth: 1,
            data: [
                this.scoreResultsOfSecondFirm.scoresForLeader.avgTechnicalScoreWithoutNulls,
                this.scoreResultsOfSecondFirm.scoresForLeader.stDevTechnicalScoreWithoutNulls,
                this.scoreResultsOfSecondFirm.scoresForLeader.avgFinancialScoreWithoutNulls,
                this.scoreResultsOfSecondFirm.scoresForLeader.stDevFinancialScoreWithoutNulls
            ]
        }, {
            label: this.l('Member'),
            backgroundColor: "blue",
            borderColor: "blue",
            borderWidth: 1,
            data: [
                this.scoreResultsOfSecondFirm.scoresForMember.avgTechnicalScoreWithoutNulls,
                this.scoreResultsOfSecondFirm.scoresForMember.stDevTechnicalScoreWithoutNulls,
                this.scoreResultsOfSecondFirm.scoresForMember.avgFinancialScoreWithoutNulls,
                this.scoreResultsOfSecondFirm.scoresForMember.stDevFinancialScoreWithoutNulls
            ]
        }];

        this.secondFirmScoreWithoutNullLabel = [
            this.l('avgTechnicalScoreWithoutNulls'),
            this.l('stDevTechnicalScoreWithoutNulls'),
            this.l('avgFinancialScoreWithoutNulls'),
            this.l('stDevFinancialScoreWithoutNulls')
        ];

        if (!this.secondFirmScoreWithoutNullDataset[0]['data'].every(_.isNull) && !this.secondFirmScoreWithoutNullDataset[1]['data'].every(_.isNull)) {
            this.secondFirmScoreWithoutNullReady = true;
        }

    }

    fillDataToComparisonCharts() {

        //Result comparison
        this.scoresAgainstEachOtherDataset = [{
            data: [
                this.firstFirmAwardedList.length,
                this.secondFirmAwardedList.length,
            ]
        }];

        this.scoresAgainstEachOtherLabel = [
            this.firstFirmName,
            this.secondFirmName
        ];

        if (!this.scoresAgainstEachOtherDataset[0]['data'].every(_.isNull)) {
            this.scoresAgainstEachOtherReady = true;
        }

    }

    close(result: any): void {
        this._dialogRef.close(result);
    }

}

// *What does 'nulls' mean? : Some old tenders in the database has no information for awarded technical or financial score.
// These tenders only have total score in record. Score statistics with nulls are filling the technical and financial scores
// with the value of total score for the abovementioned tenders and giving a value. Score statistics without nulls, however,
// does not fill the technical and financial scores, but ignores these tenders and gives result based on given technical and
// financial scores.

import { Component, Inject, Injector, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppComponentBase } from '@shared/app-component-base';
import { CorporateServiceProxy, OldTendersOfFirmDto, ScoreStatisticsOfFirmAllResultsDto, FirmsDto, ContactFirmDto, ShortlistResultsOfFirmDto, FirmYearlyResultDto } from '@shared/service-proxies/service-proxies';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import _ from 'lodash';

@Component({
    templateUrl: './detail-firm.component.html'
})

export class FirmDetailDialogComponent extends AppComponentBase implements OnInit {

    firm: FirmsDto = new FirmsDto();
    firmContactList: ContactFirmDto[] = [];
    oldTendersOfFirmList: OldTendersOfFirmDto[] = [];
    yearlyResultList: FirmYearlyResultDto[] = [];
    shortlistResults: ShortlistResultsOfFirmDto = new ShortlistResultsOfFirmDto();
    scoreResults: ScoreStatisticsOfFirmAllResultsDto = new ScoreStatisticsOfFirmAllResultsDto();
    scoreStatisticKeys: any;

    //Score statistics with nulls* for first firm
    scoreWithNullReady: boolean = false;
    scoreWithNullDataset: ChartDataSets[];
    scoreWithNullLabel: Label[];

    //Score statistics without nulls* for first firm
    scoreWithoutNullReady: boolean = false;
    scoreWithoutNullDataset: ChartDataSets[];
    scoreWithoutNullLabel: Label[];

    //Shortlist statistics (Role distribution)
    shortlistRolesReady: boolean = false;
    shortlistRolesDataset: ChartDataSets[];
    shortlistRolesLabel: Label[];

    //Shortlist statistics for leader role
    shortlistLeaderScoresReady: boolean = false;
    shortlistLeaderScoresDataset: ChartDataSets[];
    shortlistLeaderScoresLabel: Label[];

    //Shortlist statistics for member role
    shortlistMemberScoresReady: boolean = false;
    shortlistMemberScoresDataset: ChartDataSets[];
    shortlistMemberScoresLabel: Label[];

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
        private _dialogRef: MatDialogRef<FirmDetailDialogComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) private _data: { firmId }
    ) {
        super(injector);
        this._corporateService.findFirm(this._data.firmId).subscribe(result => {
            this.firm = result;
        })
    }

    ngOnInit() {
        this.getOldTendersOfFirm();
        this.getEmployeesOfFirm();
        this.getShortlistStatistics();
        this.getScoreStatistics();
        this.getYearlyResults();
    }

    getOldTendersOfFirm() {
        this._corporateService.getOldTendersOfFirm(this._data.firmId).subscribe(result => {
            this.oldTendersOfFirmList = result;
        })
    }

    getEmployeesOfFirm() {
        this._corporateService.getContactFirmForTableByFirmId(this._data.firmId).subscribe(result => {
            this.firmContactList = result;
        })
    }

    getYearlyResults() {
        this._corporateService.getYearlyResultsOfFirm(this._data.firmId).subscribe(result => {
            this.yearlyResultList = result;
            console.log(this.yearlyResultList);
        })
    }

    getShortlistStatistics() {
        this._corporateService.getShortlistCountsWithRole(this._data.firmId).subscribe(result => {
            this.shortlistResults = result;
            this.fillDataToFirstFirmShortlistCharts();
        })
    }

    getScoreStatistics() {
        this._corporateService.getScoreStatisticsOfFirm(this._data.firmId).subscribe(result => {
            this.scoreResults = result;
            this.fillDataToScoreCharts();
            this.scoreStatisticKeys = Object.keys(this.scoreResults.scoresForTotal);
            this.scoreStatisticKeys.forEach((item, index) => {
                if (item === "id") this.scoreStatisticKeys.splice(index, 1);
            });
        })
    }

    fillDataToScoreCharts() {

        //Score statistics with nulls*
        this.scoreWithNullDataset = [{
            label: this.l('Leader'),
            backgroundColor: "red",
            borderColor: "red",
            borderWidth: 1,
            data: [
                this.scoreResults.scoresForLeader.avgTechnicalScoreWithNulls,
                this.scoreResults.scoresForLeader.stDevTechnicalScoreWithNulls,
                this.scoreResults.scoresForLeader.avgFinancialScoreWithNulls,
                this.scoreResults.scoresForLeader.stDevFinancialScoreWithNulls
            ]
        }, {
            label: this.l('Member'),
            backgroundColor: "blue",
            borderColor: "blue",
            borderWidth: 1,
            data: [
                this.scoreResults.scoresForMember.avgTechnicalScoreWithNulls,
                this.scoreResults.scoresForMember.stDevTechnicalScoreWithNulls,
                this.scoreResults.scoresForMember.avgFinancialScoreWithNulls,
                this.scoreResults.scoresForMember.stDevFinancialScoreWithNulls
            ]
        }];

        this.scoreWithNullLabel = [
            this.l('avgTechnicalScoreWithNulls'),
            this.l('stDevTechnicalScoreWithNulls'),
            this.l('avgFinancialScoreWithNulls'),
            this.l('stDevFinancialScoreWithNulls')
        ];

        if (!this.scoreWithNullDataset[0]['data'].every(_.isNull) && !this.scoreWithNullDataset[1]['data'].every(_.isNull)) {
            this.scoreWithNullReady = true;
        }

        //Score statistics without nulls*
        this.scoreWithoutNullDataset = [{
            label: this.l('Leader'),
            backgroundColor: "red",
            borderColor: "red",
            borderWidth: 1,
            data: [
                this.scoreResults.scoresForLeader.avgTechnicalScoreWithoutNulls,
                this.scoreResults.scoresForLeader.stDevTechnicalScoreWithoutNulls,
                this.scoreResults.scoresForLeader.avgFinancialScoreWithoutNulls,
                this.scoreResults.scoresForLeader.stDevFinancialScoreWithoutNulls
            ]
        }, {
            label: this.l('Member'),
            backgroundColor: "blue",
            borderColor: "blue",
            borderWidth: 1,
            data: [
                this.scoreResults.scoresForMember.avgTechnicalScoreWithoutNulls,
                this.scoreResults.scoresForMember.stDevTechnicalScoreWithoutNulls,
                this.scoreResults.scoresForMember.avgFinancialScoreWithoutNulls,
                this.scoreResults.scoresForMember.stDevFinancialScoreWithoutNulls
            ]
        }];

        this.scoreWithoutNullLabel = [
            this.l('avgTechnicalScoreWithoutNulls'),
            this.l('stDevTechnicalScoreWithoutNulls'),
            this.l('avgFinancialScoreWithoutNulls'),
            this.l('stDevFinancialScoreWithoutNulls')];

        if (!this.scoreWithoutNullDataset[0]['data'].every(_.isNull) && !this.scoreWithoutNullDataset[1]['data'].every(_.isNull)) {
            this.scoreWithoutNullReady = true;
        }

    }

    fillDataToFirstFirmShortlistCharts() {

        //Shortlist statistics (Role distribution)
        this.shortlistRolesDataset = [{
            data: [
                this.shortlistResults['totalNumberAsLeader'],
                this.shortlistResults['totalNumberAsMember']
            ]
        }];

        this.shortlistRolesLabel = [
            this.l('Leader'),
            this.l('Member')];

        if (!this.shortlistRolesDataset[0]['data'].every(x => x == 0)) {
            this.shortlistRolesReady = true;
        }

        //Shortlist statistics for leader role
        this.shortlistLeaderScoresDataset = [{
            data: [
                this.shortlistResults['totalAwardAsLeader'],
                this.shortlistResults['totalLostAsLeader'],
                this.shortlistResults['totalUnannouncedAsLeader'],
                this.shortlistResults['totalCancelledAsLeader']
            ]
        }];

        this.shortlistLeaderScoresLabel = [
            this.l('Won'),
            this.l('Lost'),
            this.l('Unannounced'),
            this.l('Cancelled')];

        if (!this.shortlistLeaderScoresDataset[0]['data'].every(x => x == 0)) {
            this.shortlistLeaderScoresReady = true;
        }

        //Shortlist statistics for member role
        this.shortlistMemberScoresDataset = [{
            data: [
                this.shortlistResults['totalAwardAsMember'],
                this.shortlistResults['totalLostAsMember'],
                this.shortlistResults['totalUnannouncedAsMember'],
                this.shortlistResults['totalCancelledAsMember']
            ]
        }];

        this.shortlistMemberScoresLabel = [
            this.l('Won'),
            this.l('Lost'),
            this.l('Unannounced'),
            this.l('Cancelled')];

        if (!this.shortlistMemberScoresDataset[0]['data'].every(x => x == 0)) {
            this.shortlistMemberScoresReady = true;
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

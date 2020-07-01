import { Component, Injector, AfterViewInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';

@Component({
    templateUrl: './offer-calculator.component.html',
    animations: [appModuleAnimation()]
})
export class OfferCalculatorComponent extends AppComponentBase {

    scoreList: number[] = [];
    aycScore: number;
    competitorScore: number;
    aycUpperTreshold: number;
    competitorOffer: number;
    breakEvenPoint: number;
    technicalScoreDifference: number;

    constructor(
        injector: Injector
    ) {
        super(injector);
        this.scoreList = [...Array(26).keys()].map(i => i + 75);
    }

    refreshScoreDifference() {
        if (this.aycScore > this.competitorScore) {
            this.technicalScoreDifference = 80 - ((this.competitorScore * 80) / this.aycScore);
        } else if (this.aycScore < this.competitorScore) {
            this.technicalScoreDifference = ((this.aycScore * 80) / this.competitorScore) - 80;
        } else {
            this.technicalScoreDifference = 0;
        }
        this.technicalScoreDifference = Math.round(this.technicalScoreDifference * 100) / 100;
        this.refreshBreakEven();
    }

    refreshBreakEven() {
        this.breakEvenPoint = this.competitorOffer * (20 + this.technicalScoreDifference) / 20;
    }
}

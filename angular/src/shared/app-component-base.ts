import { PermissionCheckerService } from '@abp/auth/permission-checker.service';
import { FeatureCheckerService } from '@abp/features/feature-checker.service';
import { LocalizationService } from '@abp/localization/localization.service';
import { MessageService } from '@abp/message/message.service';
import { AbpMultiTenancyService } from '@abp/multi-tenancy/abp-multi-tenancy.service';
import { NotifyService } from '@abp/notify/notify.service';
import { SettingService } from '@abp/settings/setting.service';
import { ElementRef, Injector } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { AppSessionService } from '@shared/session/app-session.service';
import { SearchParamList, SearchParamAnd, SearchParamOr } from './service-proxies/service-proxies';

export abstract class AppComponentBase {

    searchParamList: SearchParamList = new SearchParamList();
    maxResult: number = 10;
    page: number = 1;
    totalItems: number;
    pageList: number[] = [];
    localizationSourceName = AppConsts.localization.defaultLocalizationSourceName;
    localization: LocalizationService;
    permission: PermissionCheckerService;
    feature: FeatureCheckerService;
    notify: NotifyService;
    setting: SettingService;
    message: MessageService;
    multiTenancy: AbpMultiTenancyService;
    appSession: AppSessionService;
    elementRef: ElementRef;

    constructor(injector: Injector) {
        this.localization = injector.get(LocalizationService);
        this.permission = injector.get(PermissionCheckerService);
        this.feature = injector.get(FeatureCheckerService);
        this.notify = injector.get(NotifyService);
        this.setting = injector.get(SettingService);
        this.message = injector.get(MessageService);
        this.multiTenancy = injector.get(AbpMultiTenancyService);
        this.appSession = injector.get(AppSessionService);
        this.elementRef = injector.get(ElementRef);
        this.searchParamList.searchParamAndList = [];
        this.searchParamList.searchParamOrList = [];
    }

    l(key: string, ...args: any[]): string {
        let localizedText = this.localization.localize(key, this.localizationSourceName);

        if (!localizedText) {
            localizedText = key;
        }

        if (!args || !args.length) {
            return localizedText;
        }

        args.unshift(localizedText);
        return abp.utils.formatString.apply(this, args);
    }

    isGranted(permissionName: string): boolean {
        return this.permission.isGranted(permissionName);
    }

    callKenobi() {
        console.log("Hello There!");
    }

    addSearchParamAnd(columnName: string, operator: number, value) {
        if (value != undefined) {
            var searchParamAnd = new SearchParamAnd();
            searchParamAnd.column = columnName;
            searchParamAnd.operatorType = operator;
            searchParamAnd.value = value;
            this.searchParamList.searchParamAndList.push(searchParamAnd);
        }
    }

    addSearchParamOr(searchParamAndList: any[]) {

        var searchParamOr = new SearchParamOr();
        searchParamOr.searchParamAndList = [];

        searchParamAndList.forEach((item) => {
            if (item.value != undefined) {
                var searchParamAnd = new SearchParamAnd();
                searchParamAnd.column = item.column;
                searchParamAnd.operatorType = item.operatorType;
                searchParamAnd.value = item.value;
                searchParamOr.searchParamAndList.push(searchParamAnd);
            }
        })

        if (searchParamOr.searchParamAndList.length != 0) {
            this.searchParamList.searchParamOrList.push(searchParamOr);
        }

    }
}

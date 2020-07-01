import { TenantAvailabilityState, ESearchParamOperatorTypes } from '@shared/service-proxies/service-proxies';

export class AppTenantAvailabilityState {
    static Available: number = TenantAvailabilityState._1;
    static InActive: number = TenantAvailabilityState._2;
    static NotFound: number = TenantAvailabilityState._3;
}

export class EStatus {
    static Forecast: number = 1;
    static Open: number = 2;
    static Closed: number = 3;
    static Shortlisted: number = 4;
    static Awarded: number = 5;
    static Cancelled: number = 6;
}

export class EStatusColorCodes {
    static 'rgb(0,204,255)': string = 'Forecast';
    static 'rgb(0,204,0)': string = 'Open';
    static 'rgb(255,26,26)': string = 'Closed';
    static 'rgb(0,102,204)': string = 'Shortlisted';
    static 'rgb(51,102,0)': string = 'Awarded';
    static 'rgb(102,0,0)': string = 'Cancelled';
}

export class ETenderType {
    static Service: number = 1;
    static Supply: number = 2;
    static Work: number = 3;
    static Grant: number = 4;
}

export class EFirmRole {
    static Leader: number = 1;
    static Member: number = 2;
}

export class EMeetingType {
    static Note: string = "Note";
    static Meeting: string = "Meeting";
}

export class EGeneralSettings {
    static MaxFirmInConsortium: number = 8;
}

export class ESearchParamOperator {
    static Equal: number = ESearchParamOperatorTypes._1;
    static NotEqual: number = ESearchParamOperatorTypes._2;
    static Include: number = ESearchParamOperatorTypes._3;
    static SmallerThan: number = ESearchParamOperatorTypes._4;
    static GreaterThan: number = ESearchParamOperatorTypes._5;
    static SmallerThanOrEqual: number = ESearchParamOperatorTypes._6;
    static GreaterThanOrEqual: number = ESearchParamOperatorTypes._7;
}

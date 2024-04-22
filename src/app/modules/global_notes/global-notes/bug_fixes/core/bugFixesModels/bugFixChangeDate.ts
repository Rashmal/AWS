export interface BugFixChangeDate {
    Id: number;
    BugFixesId: string;
    UserId: string;
    OldFromDate: Date;
    OldToDate: Date;
    OldDuration: number;
    NewFromDate: Date;
    NewToDate: Date;
    NewDuration: number;
    Reason: string;
}
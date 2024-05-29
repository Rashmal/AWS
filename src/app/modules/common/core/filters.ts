export interface Filter {
    SearchQuery: string;
    RecordsPerPage: number;
    CurrentPage: number;
    StaffId: string;
    StatusId: number;
    PriorityId: number;
    ModuleId: number;
    StartDate: Date;
    EndDate: Date;
    ParentId: number;
    Id: string;
    SortDirection: string;
    SortColumn: string;
    Param1?: string;
}
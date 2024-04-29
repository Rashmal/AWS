import { BasicUserDetails } from "src/app/modules/authentication/core/authenticationModals/basicUserDetails";

export interface ViewBugFix {
    Id: string;
    Title: string;
    StatusName: string;
    StartDate: Date;
    EndDate: Date;
    EstimatedHours: number;
    PriorityName: string;
    RequestedStaffList: BasicUserDetails[];
    Total: number;
    HasRequest: number;
}
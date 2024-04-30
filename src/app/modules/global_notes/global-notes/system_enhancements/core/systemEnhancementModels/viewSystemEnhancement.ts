import { BasicUserDetails } from "src/app/modules/authentication/core/authenticationModals/basicUserDetails";

export interface ViewSystemEnhancement {
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
    IsNew: boolean;
}
import { BasicUserDetails } from "src/app/modules/authentication/core/authenticationModals/basicUserDetails";

export interface SystemEnhancement {
    Id: string;
    PriorityId: number;
    StatusId: number;
    ModuleId: number;
    AddedUserId: string;
    EstimatedHours: number;
    Title: string;
    Description: string;
    StartDate: Date;
    EndDate: Date;
    AssignedStaffList: BasicUserDetails[];
    RequestedStaffList: BasicUserDetails[];
    HasRequest: number;
    IsNew: boolean;
}
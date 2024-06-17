import { UserRole } from "../../common/core/userRole";

export interface DisplayStaffDetails {
    Id: string;
    FullName: string;
    PrimaryUserRole: string;
    UserRoleList: UserRole[];
    CreatedDate: Date;
    CreatedBy: string;
    Email: string;
    Address: string;
    DateOfBirth: Date;
    Avatar: string;
    Total: number;
}
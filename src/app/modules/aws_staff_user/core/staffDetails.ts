import { BusinessAddress } from "../../aws_client/core/businessAddress";
import { UserRole } from "../../common/core/userRole";

export interface StaffDetails {
    Id: string;
    FirstName: string;
    LastName: string;
    Email: string;
    DateOfBirth: Date;
    UserRoleList: number[];
    AccountId: string;
    BusinessAddress: BusinessAddress;
}
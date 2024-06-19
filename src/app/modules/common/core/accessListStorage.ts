import { AccessSubTabDetails } from "../../aws_staff_user/core/subTabDetails";

export interface AccessListStorage {
    CompanyId: number;
    UserRoleCode: string;
    ModuleCode: string;
    AccessList: AccessSubTabDetails[];
}
import { RoleDetails } from "../../common/core/roleDetails";
import { ClientRequirementFile } from "./clientRequirementFile";

export interface ClientRequirement {
    Id: number;
    Title: string;
    AdditionalData: string;
    RoleDetails: RoleDetails[];
    ClientRequirementFiles: ClientRequirementFile[];
    TotalRecords: number;
}
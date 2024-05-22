import { RoleDetails } from "../../common/core/roleDetails";

export interface ClientRequirement {
    Id: number;
    Title: string;
    AdditionalData: string;
    RoleDetails: RoleDetails;
}
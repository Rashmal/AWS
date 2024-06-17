import { AccessFeatureDetails } from "./accessLevelFeatureDetails";

export interface AccessSubTabDetails {
    Id: number;
    Name: string;
    EnableAccess: boolean;
    AccessLevelFeatureDetailsList: AccessFeatureDetails[];
    DefaultColRef: number;
    SubTabCode: string;
}
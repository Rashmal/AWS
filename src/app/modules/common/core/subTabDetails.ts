import { AccessLevelFeatureDetails } from "./accessLevelFeatureDetails";

export interface SubTabDetails{
    Id: number;
    Name: string;
    EnableAccess: boolean;
    TotalRecords: number;
    AccessLevelFeatureDetailsList: AccessLevelFeatureDetails[];
   
}
import { AccessLevelFeatureDetails } from "./accessLevelFeatureDetails";

export interface SubTabDetails{
    Id: number;
    Name: string;
    EnableAccess: boolean;
    Total: number;
    AccessLevelFeatureDetailsList: AccessLevelFeatureDetails[];
   
}
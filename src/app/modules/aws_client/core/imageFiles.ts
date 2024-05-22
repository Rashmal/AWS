import { ResourceType } from "../../common/core/resourceType";

export interface ImageFiles {
    Id: number;
    Caption: string;
    ResourceFile: string;
    InternalNotes: string;
    ResourceType: ResourceType;
}
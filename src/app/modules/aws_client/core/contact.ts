import { ContactType } from "../../common/core/contactType";

export interface Contact {
    Id: number;
    Name: string;
    ContactValue: string;
    ContactType: ContactType;
    TotalRecords ?: number;
}
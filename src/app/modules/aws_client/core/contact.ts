import { ContactType } from "../../common/core/contactType";

export interface Contact {
    Id: number;
    Name: string;
    ContactDetails: ContactDetails[];
    TotalRecords ?: number;
}

export interface ContactDetails{
    Id: number;
    ContactValue: string;
    ContactType: ContactType;
}


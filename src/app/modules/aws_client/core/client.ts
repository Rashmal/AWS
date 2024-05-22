import { Address } from "./address";
import { Contact } from "./contact";

export interface Client{
    ClientId: number;
    FirstName: string;
    BusinessName: string;
    MiddleInitial: string;
    BusinessNumberType: string;
    BusinessNumber: number;
}

export interface DisplayClientDetails{
    Id: number;
    CreatedBy: string;
    CreatedDate: Date;
    FullName: string;
    Contacts: Contact [];
    PaymentTerm: string;
    BillingAddress: string;
    FinancialNotes: string;
    ExpenseAccount: string; 

}
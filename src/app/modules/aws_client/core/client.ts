import { BusinessNumberType } from "../../common/core/businessNumberType";
import { BusinessAddress } from "./businessAddress";
import { Contact } from "./contact";

export interface ClientCustomer {
    Id: number;
    FirstName: string;
    BusinessName: string;
    MiddleInitial: string;
    BusinessNumber: string;
    BusinessNumberType: BusinessNumberType;
}

export interface DisplayClientDetails{
    Id: number;
    CreatedBy: string;
    CreatedDate: Date;
    FullName: string;
    Contacts: Contact[];
    PaymentTerm: string;
    BillingAddress: string;
    FinancialNotes: string;
    ExpenseAccount: string;
    TotalRecords ?: number;
}
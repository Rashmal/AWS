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

<<<<<<< HEAD
export interface DisplayClientDetails{
    Id: number;
=======
export interface DisplayClientDetails {
>>>>>>> 78cd45a931e0273c1e2cf088f52a4acb1a06c1a1
    CreatedBy: string;
    CreatedDate: Date;
    FullName: string;
    Contacts: Contact[];
    PaymentTerm: string;
    BillingAddress: string;
    FinancialNotes: string;
    ExpenseAccount: string;
}
import { AccountDetails } from "../../common/core/accountDetails";
import { ClientSize } from "../../common/core/clientSize";
import { DayDetails } from "../../common/core/dayDetails";
import { PriceClassification } from "../../common/core/priceClassification";
import { RatingDetails } from "../../common/core/ratingDetails";
import { TermType } from "../../common/core/termType";

export interface RelationshipDetails {
    Id: number;
    OfficeJob: number;
    WorkCredit: number;
    ClientTerms: number;
    DefaultDeposit: number;
    MonthDayAlert: number;
    FinancialNotes: string;
    SupplierTerms: number;
    IsSupplier: boolean;
    IsSubcontractor: boolean;
    IsClient: boolean;
    IsAutoProgressReport: boolean;
    NextReportDateTime: Date;
    PriceClassification: PriceClassification;
    ClientSize: ClientSize;
    TermType: TermType;
    ClientTermType: TermType;
    SupplierTermType: TermType;
    DayDetails: DayDetails;
    RatingDetails: RatingDetails;
    ExpenseAccount: AccountDetails;
}
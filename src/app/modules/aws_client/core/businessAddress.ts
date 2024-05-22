import { Country } from "../../common/core/country";

export interface BusinessAddress {
    Id: number;
    BillingName: string;
    StreetName: string;
    Suburb: string;
    PostalCode: string;
    State: string;
    Country: Country;
}
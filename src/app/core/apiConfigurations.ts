import { SelectItem } from "primeng/api";

// Live API Server
export const API$DOMAIN = "https://localhost:7198/";
//export const API$DOMAIN = "https://iitcdemoapi.com/AWSAPI/";

// Setting the length limit
export const LOGIN$USER_EMAIL$LIMIT: number = 50;
export const LOGIN$USER_PASSWORD$LIMIT: number = 25;

export const SYSTEM_ENHANCEMENT$TITLE$LIMIT: number = 500;

// Storing the no of records per page config
export const NO$OF$RECORDS$PER$PAGE: SelectItem[] = [
    {
        value: 10,
        label: '10 records per page'
    },
    {
        value: 15,
        label: '15 records per page'
    },
    {
        value: 20,
        label: '20 records per page'
    },
    {
        value: 25,
        label: '25 records per page'
    },
    {
        value: 30,
        label: '30 records per page'
    },
    {
        value: 50,
        label: '50 records per page'
    },
    {
        value: 100,
        label: '100 records per page'
    }
];
export interface OverallCookieInterface {
    // ----------------------------- Setters ----------------------------- 
    SetUserToken(userToken: string): void;

    // ----------------------------- Getters ----------------------------- 
    GetUserToken(): string;
    GetUserFullName(): string;
    GetUserId(): string;
    GetUserEmail(): string;
}
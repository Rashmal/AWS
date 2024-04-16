export interface OverallCookieInterface {
    // ----------------------------- Setters ----------------------------- 
    SetUserToken(userToken: string): void;
    ClearCookies(): void;
    // ----------------------------- Getters ----------------------------- 
    GetUserToken(): string;
    GetUserFullName(): string;
    GetUserId(): string;
    GetUserEmail(): string;
    GetUserRole(): string;
}
export interface OverallCookieInterface {
    // ----------------------------- Setters ----------------------------- 
    SetUserToken(userToken: string): void;
    SetCompanyId(companyId: number): void;
    ClearCookies(): void;
    // ----------------------------- Getters ----------------------------- 
    GetUserToken(): string;
    GetUserFullName(): string;
    GetUserId(): string;
    GetUserEmail(): string;
    GetUserRole(): string;
    GetCompanyId(): number;
}
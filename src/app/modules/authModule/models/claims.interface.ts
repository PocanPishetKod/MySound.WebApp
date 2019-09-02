export interface IClaims
{
    authenticationMethods: string[];
    accessApis: string[];
    startTokenDate: Date;
    endTokenDate: Date;
    subject: string;
    scopes: string[];
    tokenIssuer: string;
    authTime: Date;
    clientId: string;
    email: string;
    username: string;
    nickname: string;
    role: string;
}
import * as ClientOAuth2 from "client-oauth2";

export interface ISavedToken
{
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    data: ClientOAuth2.Data;
}
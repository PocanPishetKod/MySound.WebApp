import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as ClientOAuth2 from "client-oauth2";
import * as JwtDecoder from "jwt-decode";
import { Claims } from '../models/claims.model';
import { IClaims } from '../models/claims.interface';
import { TokenRepository } from './token-repository.service';

export interface ISaveToken
{
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    data: ClientOAuth2.Data;
}

@Injectable({
    providedIn: "root"
})
export class AuthService 
{
    private mySoundAuth: ClientOAuth2;
    private user: ClientOAuth2.Token;

    private secondsBeforeExpiration: number;
    private timerId: number;

    constructor(private httpClient: HttpClient, private tokenRepository: TokenRepository)
    {
        this.mySoundAuth = new ClientOAuth2(this.getClientSettings());
        this.secondsBeforeExpiration = 10;

        tokenRepository.getToken().then(saveToken =>
        {
            this.user = this.createToken(saveToken); 
        });
    }

    private getClientSettings(): ClientOAuth2.Options
    {
        return {
            accessTokenUri: "http://localhost:5000/connect/token",
            clientId: "browser",
            scopes: ["api1", "openid", "email", "profile", "offline_access"]
        };
    }

    private setRefreshTokenTimer(time: number): void
    {
        this.timerId = window.setTimeout(this.refreshToken, time);
    }

    private cancelRefreshTokenTimer(): void
    {
        window.clearTimeout(this.timerId);
    }

    private createToken(saveToken: ISaveToken): ClientOAuth2.Token
    {
        if (saveToken)
        {
            let token = new ClientOAuth2.Token(new ClientOAuth2(this.getClientSettings()), saveToken.data);
            token.accessToken = saveToken.accessToken;
            token.refreshToken = saveToken.refreshToken;
            token.tokenType = saveToken.tokenType;

            return token;
        }

        return null;
    }

    public isAuthenticated(): boolean
    {
        if (this.user)
        {
            return !this.user.expired();
        }

        return false;
    }

    public getClaims(): IClaims
    {
        if (this.user)
        {
            let decodedPayload = JwtDecoder(this.user.accessToken);
            console.log(decodedPayload);
            if (decodedPayload)
            {
                return new Claims(decodedPayload);
            }
        }

        return null;
    }

    public getBearer(): string
    {
        if (this.user)
        {
            return this.user.accessToken;
        }

        return null;
    }

    public async authentication(username: string, password: string): Promise<boolean>
    {
        let token = await this.mySoundAuth.owner.getToken(username, password);
        if (token)
        {
            this.user = token;

            let saveToken: ISaveToken = {
                accessToken: this.user.accessToken,
                data: this.user.data,
                refreshToken: this.user.refreshToken,
                tokenType: this.user.tokenType
            };
            console.log(saveToken);
            await this.tokenRepository.setToken(saveToken);

            this.setRefreshTokenTimer(Number.parseInt(this.user.data.expires_in) - this.secondsBeforeExpiration);

            let claims = this.getClaims();
            console.log(claims);
            
            return true;
        }

        return false;
    }

    public async refreshToken(): Promise<boolean>
    {
        if (this.user)
        {
            let token = await this.user.refresh();
            if (token)
            {
                this.user = token;
                this.setRefreshTokenTimer(Number.parseInt(this.user.data.expires_in) - this.secondsBeforeExpiration);

                return true;
            }
        }

        return false;
    }

    public async signout(): Promise<void>
    {
        if (this.user)
        {
            this.cancelRefreshTokenTimer();
            this.user.expiresIn(0);
        }
    }
}
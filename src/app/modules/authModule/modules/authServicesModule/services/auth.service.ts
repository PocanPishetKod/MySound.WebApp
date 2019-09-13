import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as ClientOAuth2 from "client-oauth2";
import * as JwtDecoder from "jwt-decode";
import { Claims } from '../../../models/claims.model';
import { IClaims } from '../../../models/claims.interface';
import { ISavedToken } from '../../../abstractions/saved-token.model.interface';
import { ITokenRepository } from '../../../abstractions/token-repository.interface';
import { RefreshTokenTimerService } from './refresh-token-timer.service';
import { tokenRepositoryInjectToken } from '../../../../indexedDbModule/services/token-repository.service';
import { AuthServicesModule } from '../auth-services.module';

@Injectable({
    providedIn: AuthServicesModule
})
export class AuthService 
{
    private _mySoundAuth: ClientOAuth2;
    private _token: ClientOAuth2.Token;

    private _secondsBeforeExpiration: number;
    private _timerId: number;

    constructor(private httpClient: HttpClient,
        @Inject(tokenRepositoryInjectToken) private _tokenRepository: ITokenRepository,
        private _refreshTokenTimerService: RefreshTokenTimerService)
    {
        this._mySoundAuth = new ClientOAuth2(this.getClientSettings());
        this._secondsBeforeExpiration = 10;

        _tokenRepository.getToken().then(savedToken =>
        {
            this._token = this.createToken(savedToken);
        });
    }

    /** Возвращает настройки клиента oauth */
    private getClientSettings(): ClientOAuth2.Options
    {
        return {
            accessTokenUri: "http://localhost:5000/connect/token",
            clientId: "browser",
            scopes: ["api1", "openid", "email", "profile", "offline_access"]
        };
    }

    /** Создает токен из сохраненного токена */
    private createToken(savedToken: ISavedToken): ClientOAuth2.Token
    {
        if (savedToken)
        {
            let token = new ClientOAuth2.Token(new ClientOAuth2(this.getClientSettings()), savedToken.data);
            token.accessToken = savedToken.accessToken;
            token.refreshToken = savedToken.refreshToken;
            token.tokenType = savedToken.tokenType;

            return token;
        }

        return null;
    }

    /** Создает токен для сохранения из токена */
    private createSavedToken(token: ClientOAuth2.Token): ISavedToken
    {
        return {
            accessToken: token.accessToken,
            data: token.data,
            refreshToken: token.refreshToken,
            tokenType: token.tokenType
        };
    }

    /** Проверяет актуальность токена */
    public isAuthenticated(): boolean
    {
        if (this._token)
        {
            return !this._token.expired();
        }

        return false;
    }

    /** Возвращает все утверждения из токена */
    public getClaims(): IClaims
    {
        if (this._token)
        {
            let decodedPayload = JwtDecoder(this._token.accessToken);
            if (decodedPayload)
            {
                return new Claims(decodedPayload);
            }
        }

        return null;
    }

    /** Возвращает access token */
    public getBearer(): string
    {
        if (this._token)
        {
            return this._token.accessToken;
        }

        return null;
    }

    /** Проводит процесс аутентификации */
    public async authentication(username: string, password: string): Promise<boolean>
    {
        let token = await this._mySoundAuth.owner.getToken(username, password);
        if (token)
        {
            this._token = token;

            let savedToken: ISavedToken = this.createSavedToken(token);
            await this._tokenRepository.saveToken(savedToken);

            let claims = this.getClaims();

            this._refreshTokenTimerService.setTimer(claims.endTokenDate, this.refreshToken);
            
            return true;
        }

        return false;
    }

    /** Обновляет access token */
    public async refreshToken(): Promise<boolean>
    {
        if (this._token)
        {
            let token = await this._token.refresh();
            if (token)
            {
                this._token = token;
                await this._tokenRepository.saveToken(this.createSavedToken(token));
                this._refreshTokenTimerService.setTimer(this.getClaims().endTokenDate, this.refreshToken);

                return true;
            }
        }

        return false;
    }

    /** Удаляет access token */
    public async signout(): Promise<void>
    {
        if (this._token)
        {
            await this._tokenRepository.removeToken();
            this._refreshTokenTimerService.cancelTimer();
            this._token = null;
        }
    }
}
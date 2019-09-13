import { DatabaseService } from './database.service';
import { ISavedToken } from '../../authModule/abstractions/saved-token.model.interface';
import { ITokenRepository } from '../../authModule/abstractions/token-repository.interface';
import { InjectionToken, inject } from '@angular/core';
import { IndexedDbModule } from '../indexed-db.module';

export const tokenRepositoryInjectToken = new InjectionToken<ITokenRepository>("tokenRepositoryInjectToken", {
    providedIn: IndexedDbModule,
    factory: () => new TokenRepository(inject(DatabaseService))
});

export class TokenRepository implements ITokenRepository
{
    private _tokenKey: string;

    constructor(private databaseService: DatabaseService)
    {
        console.log(databaseService.databaseName);
        this._tokenKey = "main";
    }

    public async getToken(): Promise<ISavedToken>
    {
        let tokenStore = await this.databaseService.getTokenStore();
        let storeToken = await tokenStore.get(this._tokenKey);

        return storeToken ? storeToken.value : null;
    }

    public async saveToken(token: ISavedToken): Promise<void>
    {
        let tokenStore = await this.databaseService.getTokenStore();
        await tokenStore.put({
            key: "main", value: token
        });
    }

    public async removeToken(): Promise<void> 
    {
        let tokenStore = await this.databaseService.getTokenStore();
        await tokenStore.delete(this._tokenKey);
    }
}
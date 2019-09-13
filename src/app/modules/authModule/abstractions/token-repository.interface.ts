import { ISavedToken } from './saved-token.model.interface';

export interface ITokenRepository
{
    getToken(): Promise<ISavedToken>;
    saveToken(token: ISavedToken): Promise<void>;
    removeToken(): Promise<void>;
}
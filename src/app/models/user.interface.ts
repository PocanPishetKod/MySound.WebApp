import { IClaims } from '../modules/authModule/models/claims.interface';

export interface IUser
{
    claims: IClaims;
    isAuthenticated(): boolean;
}
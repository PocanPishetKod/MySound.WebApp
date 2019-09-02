import { IUser } from './user.interface';
import { IClaims } from '../modules/authModule/models/claims.interface';
import { AuthService } from '../modules/authModule/services/auth.service';

export class User implements IUser
{
    public claims: IClaims;
    
    constructor(private authService: AuthService)
    {
        this.claims = authService.getClaims();
    }

    public isAuthenticated(): boolean
    {
        return this.authService.isAuthenticated();
    }
}
import { IClaims } from '../models/claims.interface';
import { AuthService } from '../modules/authServicesModule/services/auth.service';
import { IUser } from 'src/app/models/user.interface';
import { InjectionToken, inject } from '@angular/core';

export const userServiceInjectToken = new InjectionToken<IUser>("userServiceInjectToken", {
    providedIn: "root",
    factory: () => new UserService(inject(AuthService))
});

export class UserService implements IUser
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
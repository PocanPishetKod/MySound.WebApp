import { IUser } from './models/user.interface';
import { AuthService } from './modules/authModule/services/auth.service';
import { User } from './models/user.model';

export class BaseClass
{
    public user: IUser;

    constructor(protected authService: AuthService)
    {
        this.user = new User(authService);   
    }
}
import { userServiceInjectToken } from './modules/authModule/services/user.service';
import { Inject } from '@angular/core';
import { IUser } from './models/user.interface';

export class BaseClass
{
    constructor(@Inject(userServiceInjectToken) public user: IUser)
    {
           
    }
}
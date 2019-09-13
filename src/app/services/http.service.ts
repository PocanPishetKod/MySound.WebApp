import { Injectable } from '@angular/core';
import { AuthService } from '../modules/authModule/modules/authServicesModule/services/auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService 
{
    constructor(private authService: AuthService, private httpClient: HttpClient)
    {
        
    }
}
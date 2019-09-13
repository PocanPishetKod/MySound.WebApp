import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../authModule/modules/authServicesModule/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})

export class HomeComponent 
{
    constructor(authService: AuthService, activateRoute: ActivatedRoute)
    {
        activateRoute.data.forEach(x => console.log(x));
    }
}
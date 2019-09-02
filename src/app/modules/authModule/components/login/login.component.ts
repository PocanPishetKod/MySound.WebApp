import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'login',
    templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
    constructor(private authService: AuthService) { }

    ngOnInit() { }

    public async login(): Promise<void>
    {
        let result = await this.authService.authentication("admin", "qwerty");
        this.authService.getClaims();
        if (result)
        {
            console.log("eeeeeeee");
        }
        else
        {
            console.log("noooo");
        }
    }

    public async refresh(): Promise<void>
    {
        let result = await this.authService.refreshToken();
        if (result)
        {
            console.log("eeeeeeee");
        }
        else
        {
            console.log("noooo");
        }
    }

    public async logout(): Promise<void>
    {
        await this.authService.signout();
    }

    public isAuth(): void
    {
        alert(this.authService.isAuthenticated() ? "yes" : "no");
    }
}
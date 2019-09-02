import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './components/login/login.component';
import { DatabaseService } from './services/database.service';
import { TokenRepository } from './services/token-repository.service';

@NgModule({
    imports: [AuthRoutingModule],
    exports: [],
    declarations: [
        LoginComponent
    ],
    providers: [
        AuthService,
        DatabaseService,
        TokenRepository
    ]
})
export class AuthModule
{ 
    
}

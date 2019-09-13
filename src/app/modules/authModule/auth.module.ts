import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { IndexedDbModule } from '../indexedDbModule/indexed-db.module';
import { AuthServicesModule } from './modules/authServicesModule/auth-services.module';
import { MatButtonModule } from '@angular/material';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
    imports: [
        AuthRoutingModule,
        IndexedDbModule,
        AuthServicesModule,
        MaterialModule
    ],
    exports: [],
    declarations: [
        LoginComponent
    ],
    providers: []
})
export class AuthModule
{ 
    
}

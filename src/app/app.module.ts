import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './modules/authModule/auth.module';
import { HomeModule } from './modules/homeModule/home.module';
import { HttpClientModule } from '@angular/common/http';
import { IUser } from './models/user.interface';
import { AuthService } from './modules/authModule/services/auth.service';
import { User } from './models/user.model';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HomeModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule
{
  
}

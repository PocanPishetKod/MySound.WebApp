import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
    imports: [HomeRoutingModule],
    exports: [],
    declarations: [HomeComponent],
    providers: [],
})
export class HomeModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home.component';

const routes: Routes = [
    { path: "home", component: HomeComponent, data: { login: "yvavidis" } }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [],
})
export class HomeRoutingModule { }
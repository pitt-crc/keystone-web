import { Routes } from '@angular/router';
import { LoginComponent } from "./authentication/components/login/login.component";
import { DashboardComponent } from "./dashboard/components/dashboard/dashboard.component";

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'login', component: LoginComponent },
];

import { Routes } from '@angular/router';
import { LoginComponent } from "./authentication/components/login/login.component";
import { LogoutComponent } from "./authentication/components/logout/logout.component";
import { DashboardComponent } from "./dashboard/components/dashboard/dashboard.component";

export const routes: Routes = [
    {path: '', component: DashboardComponent},
    {path: 'auth', children: [
        {path: 'login', component: LoginComponent},
        {path: 'logout', component: LogoutComponent},
    ]},
];

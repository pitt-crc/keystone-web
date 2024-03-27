import { Routes } from '@angular/router';
import { LoginComponent } from "./authentication/components/login/login.component";
import { LogoutComponent } from "./authentication/components/logout/logout.component";
import { DashboardComponent } from "./dashboard/components/dashboard/dashboard.component";
import { authGuard } from "./authentication/guards/authGuard";
import { PageNotFoundComponent } from "./common/components/page-not-found/page-not-found.component";

export const routes: Routes = [
    {path: '', component: DashboardComponent, canActivate: [authGuard]},
    {path: 'auth', children: [
        {path: 'login', component: LoginComponent},
        {path: 'logout', component: LogoutComponent},
    ]},
    {path: '**', component: PageNotFoundComponent},
];

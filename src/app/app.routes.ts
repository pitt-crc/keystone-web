import { Routes } from '@angular/router';

import { AuthLayoutComponent } from "./authentication/components/auth-layout/auth-layout.component";
import { LoginComponent } from "./authentication/components/login/login.component";
import { LogoutComponent } from "./authentication/components/logout/logout.component";
import { PageNotFoundComponent } from "./common/components/page-not-found/page-not-found.component";
import { authGuard } from "./common/guards/authGuard";
import { DashboardLayoutComponent } from "./dashboard/components/dashboardLayout/dashboardLayout.component";

export const routes: Routes = [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {path: 'dashboard', component: DashboardLayoutComponent, canActivate: [authGuard]},
    {path: 'auth', component: AuthLayoutComponent, children: [
        {path: 'login', component: LoginComponent},
        {path: 'logout', component: LogoutComponent},
    ]},
    {path: '**', component: PageNotFoundComponent},
];

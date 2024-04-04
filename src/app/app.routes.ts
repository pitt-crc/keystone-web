import { Routes } from '@angular/router';
import { LoginComponent } from "./authentication/components/login/login.component";
import { LogoutComponent } from "./authentication/components/logout/logout.component";
import { DashboardLayoutComponent } from "./dashboard/components/dashboardLayout/dashboardLayout.component";
import { authGuard } from "./authentication/guards/authGuard";
import { PageNotFoundComponent } from "./common/components/page-not-found/page-not-found.component";
import { AuthComponent } from "./authentication/components/auth/auth.component";

export const routes: Routes = [
    {path: '', component: DashboardLayoutComponent, canActivate: [authGuard]},
    {path: 'auth', component: AuthComponent, children: [
        {path: 'login', component: LoginComponent},
        {path: 'logout', component: LogoutComponent},
    ]},
    {path: '**', component: PageNotFoundComponent},
];

import { Routes } from '@angular/router';

import { CenterPageLayoutComponent } from "./common/components/center-page-layout/center-page-layout.component";
import { LoginComponent } from "./authentication/components/login/login.component";
import { LogoutComponent } from "./authentication/components/logout/logout.component";
import { PageNotFoundComponent } from "./page-not-found/components/page-not-found/page-not-found.component";
import { authGuard } from "./common/guards/authGuard";
import { DashboardComponent } from "./dashboard/components/dashboard/dashboard.component";
import { SideNavLayoutComponent } from "./common/components/side-nav-layout/side-nav-layout.component";

export const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: SideNavLayoutComponent, canActivate: [authGuard], children: [
    {path: '', component: DashboardComponent},
  ]},
  {path: 'auth', component: CenterPageLayoutComponent, children: [
    {path: 'login', component: LoginComponent},
    {path: 'logout', component: LogoutComponent},
  ]},
  {path: '**', component: PageNotFoundComponent},
];

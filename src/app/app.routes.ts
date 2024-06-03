import { Routes } from '@angular/router';

import { CenterPageLayoutComponent } from "./layouts/components/center-page-layout/center-page-layout.component";
import { LoginComponent } from "./pages/components/login/login.component";
import { LogoutComponent } from "./pages/components/logout/logout.component";
import { PageNotFoundComponent } from "./pages/components/page-not-found/page-not-found.component";
import { authGuard } from "./core/guards/authGuard";
import { DashboardComponent } from "./pages/components/dashboard/dashboard.component";
import { SideNavLayoutComponent } from "./layouts/components/side-nav-layout/side-nav-layout.component";

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

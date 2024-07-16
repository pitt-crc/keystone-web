import { Routes } from '@angular/router';

import { authGuard } from "./core/guards/authGuard";
import { DashboardComponent } from "./pages/components/dashboard/dashboard.component";
import { LoginComponent } from "./pages/components/login/login.component";
import { LogoutComponent } from "./pages/components/logout/logout.component";
import { PageNotFoundComponent } from "./pages/components/page-not-found/page-not-found.component";

export const routes: Routes = [
  {path: '', redirectTo: 'app', pathMatch: 'full'},
  {
    path: 'app', canActivate: [authGuard], children: [
      {path: '', component: DashboardComponent},
    ]
  },
  {path: 'auth/login', component: LoginComponent},
  {path: 'auth/logout', component: LogoutComponent},
  {path: '**', component: PageNotFoundComponent},
];

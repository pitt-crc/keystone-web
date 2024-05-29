import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";

import { environment } from '../../../../environments/environment';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { TopbarComponent } from "../topbar/topbar.component";

@Component({
  selector: 'app-dashboardLayout',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    TopbarComponent
  ],
  templateUrl: 'dashboardLayout.component.html'
})
export class DashboardLayoutComponent {
  version = environment.version;
}

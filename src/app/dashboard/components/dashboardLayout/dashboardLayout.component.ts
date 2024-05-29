import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-dashboardLayout',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: 'dashboardLayout.component.html'
})
export class DashboardLayoutComponent {
  version = environment.version;
}

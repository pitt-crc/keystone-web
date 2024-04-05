import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import packageJson from '../../../../../package.json';

@Component({
  selector: 'app-dashboardLayout',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: 'dashboardLayout.component.html'
})
export class DashboardLayoutComponent {
  version = packageJson.version;
}

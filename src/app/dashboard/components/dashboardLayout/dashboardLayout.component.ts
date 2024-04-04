import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-dashboardLayout',
  standalone: true,
  templateUrl: 'dashboardLayout.component.html',
  imports: [
    RouterOutlet
  ]
})
export class DashboardLayoutComponent {}

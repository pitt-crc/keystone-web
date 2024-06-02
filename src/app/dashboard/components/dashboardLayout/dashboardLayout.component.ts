import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { TopNavComponent } from "../topNav/topNav.component";
import { SideNavComponent } from "../sideNav/sideNav.component";

@Component({
  selector: 'app-dashboardLayout',
  standalone: true,
  imports: [RouterOutlet, TopNavComponent, SideNavComponent],
  templateUrl: 'dashboardLayout.component.html',
  styleUrl: 'dashboardLayout.component.scss'
})
export class DashboardLayoutComponent {}

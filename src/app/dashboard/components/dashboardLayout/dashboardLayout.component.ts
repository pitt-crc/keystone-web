import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";

import { environment } from '../../../../environments/environment';
import { KeyValuePipe, NgForOf } from "@angular/common";
import { TopNavComponent } from "../topNav/topNav.component";
import { SideNavComponent } from "../sideNav/sideNav.component";
@Component({
  selector: 'app-dashboardLayout',
  standalone: true,
  imports: [RouterOutlet, KeyValuePipe, NgForOf, TopNavComponent, SideNavComponent],
  templateUrl: 'dashboardLayout.component.html',
  styleUrl: 'dashboardLayout.component.scss'
})
export class DashboardLayoutComponent {
  version = environment.version;
  navStructure: NavStructure = {
    Overview: {
      Dashboard: {href: 'dashboard', icon: 'speedometer'},
    },
    Resources: {
      Allocations: {href: 'resources/allocations', icon: 'cpu'},
      Requests: {href: 'resources/requests', icon: 'arrow-clockwise'},
      Usage: {href: 'resources/usage', icon: 'bar-chart'},
    },
    Research: {
      Publications: {href: 'research/publications', icon: 'journal-text'},
      Grants: {href: 'research/grants', icon: 'coin'},
    }
  };
}

interface NavStructure {
  [key: string]: {
    [subKey: string]: {
      href: string;
      icon: string;
    }
  };
}

import { Component } from '@angular/core';
import { BootstrapIconsModule } from "ng-bootstrap-icons";
import { KeyValuePipe, NgForOf } from "@angular/common";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [BootstrapIconsModule, KeyValuePipe, NgForOf],
  templateUrl: 'sidebar.component.html',
})
export class SidebarComponent {
  navStructure: NavStructure = {
    Overview: {
      Dashboard: {href: 'dashboard', icon: 'alarm'},
      Example: {href: 'settings', icon: 'app'},
      Hello: {href: 'settings', icon: 'github'}
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

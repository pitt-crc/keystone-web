import { Component } from '@angular/core';
import { KeyValuePipe, NgForOf } from "@angular/common";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [KeyValuePipe, NgForOf],
  templateUrl: 'sidebar.component.html',
})
export class SidebarComponent {
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

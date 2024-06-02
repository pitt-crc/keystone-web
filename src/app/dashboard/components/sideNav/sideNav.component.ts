import { Component } from '@angular/core';

import { environment } from "../../../../environments/environment";
import { KeyValuePipe, NgForOf } from "@angular/common";

@Component({
  selector: 'app-sideNav',
  standalone: true,
  imports: [KeyValuePipe, NgForOf],
  templateUrl: 'sideNav.component.html',
  styleUrl: 'sideNav.component.scss'
})
export class SideNavComponent {
  version: string = environment.version;
  navStructure: NavSection[] = [
    {
      title: 'Overview',
      links: {
        Dashboard: {href: 'dashboard', icon: 'speedometer'},
      }
    },
    {
      title: 'Resources',
      links: {
        Allocations: {href: 'resources/allocations', icon: 'cpu'},
        Requests: {href: 'resources/requests', icon: 'arrow-clockwise'},
        Usage: {href: 'resources/usage', icon: 'bar-chart'},
      }
    },
    {
      title: 'Research',
      links: {
        Publications: {href: 'research/publications', icon: 'journal-text'},
        Grants: {href: 'research/grants', icon: 'coin'},
      }
    }
  ];
}

interface NavLink {
  href: string;
  icon: string;
}

interface NavSection {
  title: string;
  links: {
    [key: string]: NavLink;
  };
}

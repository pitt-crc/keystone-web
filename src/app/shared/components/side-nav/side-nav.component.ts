import { NgForOf, NgIf, NgOptimizedImage } from "@angular/common";
import { Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";

import { SideNavService } from "../../services/sidenav.service";

interface NavLink {
  text: string;
  href: string;
  icon: string;
}

interface NavSection {
  title: string;
  links: NavLink[];
}

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [NgForOf, NgOptimizedImage, RouterLink, NgIf],
  templateUrl: 'side-nav.component.html',
  styleUrl: 'side-nav.component.scss'
})
export class SideNavComponent implements OnInit {
  // TODO: move nt a user data service
  userImageUrl: string = "https://github.com/mdo.png";
  firstName: string = "John Smith";
  username: string = "jsmith";

  isActive: boolean = false;
  navStructure: NavSection[] = [
    {
      title: 'Overview',
      links: [
        {text: 'Dashboard', href: '/app', icon: 'speedometer'},
      ]
    }, {
      title: 'Resources',
      links: [
        {text: 'Requests', href: 'resources/requests', icon: 'arrow-clockwise'},
        {text: 'Allocations', href: 'resources/allocations', icon: 'cpu'},
        {text: 'Job History', href: 'resources/usage', icon: 'bar-chart'}
      ]
    }, {
      title: 'Research',
      links: [
        {text: 'Publications', href: 'research/publications', icon: 'journal-text'},
        {text: 'Grants', href: 'research/grants', icon: 'coin'},
      ]
    }
  ];

  constructor(private sideNavService: SideNavService) {}

  /**
   * Subscribes to the sidebar visibility state changes and updates isActive accordingly.
   */
  ngOnInit(): void {
    this.sideNavService.sidebarVisible$.subscribe(visible => {
      this.isActive = visible;
    });
  }
}

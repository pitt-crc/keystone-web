import { Component } from '@angular/core';

import { NgForOf, NgOptimizedImage } from "@angular/common";
import { RouterLink } from "@angular/router";

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
  imports: [NgForOf, NgOptimizedImage, RouterLink],
  templateUrl: 'sideNav.component.html',
  styleUrl: 'sideNav.component.scss'
})
export class SideNavComponent {
  isActive: boolean = false;
  navStructure: NavSection[] = [
    {
      title: 'Overview',
      links: [
        {text: 'Dashboard', href: 'dashboard', icon: 'speedometer'},
      ]
    },
    {
      title: 'Resources',
      links: [
        {text: 'Requests', href: 'resources/requests', icon: 'arrow-clockwise'},
        {text: 'Allocations', href: 'resources/allocations', icon: 'cpu'},
        {text: 'Job History', href: 'resources/usage', icon: 'bar-chart'}
      ]
    },
    {
      title: 'Research',
      links: [
        {text: 'Publications', href: 'research/publications', icon: 'journal-text'},
        {text: 'Grants', href: 'research/grants', icon: 'coin'},
      ]
    }
  ];
}

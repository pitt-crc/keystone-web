import { NgOptimizedImage } from "@angular/common";
import { Component } from '@angular/core';

import { SideNavService } from "../../services/sidenav.service";

@Component({
  selector: 'app-top-nav',
  standalone: true,
  templateUrl: 'top-nav.component.html',
  imports: [
    NgOptimizedImage
  ],
  styleUrl: 'top-nav.component.scss'
})
export class TopNavComponent {
  constructor(private sideNavService: SideNavService) {}

  toggleSidebar(): void {
    this.sideNavService.toggleSidebar();
  }
}

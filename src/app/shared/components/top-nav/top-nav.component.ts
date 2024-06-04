import { NgOptimizedImage } from "@angular/common";
import { Component } from '@angular/core';

import { SettingsDropdownComponent } from "../settings-dropdown/settings-dropdown.component";
import { SideNavService } from "../../services/sidenav.service";

@Component({
  selector: 'app-top-nav',
  standalone: true,
  templateUrl: 'top-nav.component.html',
  imports: [NgOptimizedImage, SettingsDropdownComponent],
  styleUrl: 'top-nav.component.scss'
})
export class TopNavComponent {
  constructor(private sideNavService: SideNavService) {}

  /**
   * Toggles the sidebar visibility when called.
   */
  toggleSidebar(): void {
    this.sideNavService.toggleSidebar();
  }
}

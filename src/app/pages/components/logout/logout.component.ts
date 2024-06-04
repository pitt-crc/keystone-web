import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { ApiService } from "../../../core/services/api.service";
import { LayoutCenterPageComponent } from "../../../layouts/components/layout-center-page/layout-center-page.component";

@Component({
  selector: 'app-logout',
  standalone: true,
  templateUrl: 'logout.component.html',
  imports: [LayoutCenterPageComponent]
})
export class LogoutComponent implements OnInit {

  constructor(private apiService: ApiService, private router: Router) {}

  /**
   * Automatically log the user out on page load
   */
  ngOnInit(): void {
    this.apiService.logout().subscribe({
      next: (): void => {
        this.router.navigateByUrl('');
      }
    });
  }

}

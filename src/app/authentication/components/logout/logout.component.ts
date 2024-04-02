import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../common/services/api.service";

@Component({
  selector: 'app-logout',
  standalone: true,
  templateUrl: 'logout.component.html',
})
export class LogoutComponent implements OnInit {
  statusText = 'You are being logged out...';

  constructor(private apiService: ApiService) {}

  /**
   * Automatically log the user out on page load
   */
  ngOnInit(): void {
    this.apiService.logout().subscribe({
      next: () => {
        this.statusText = 'You have been successfully logged out.';
      }
    });
  }

}

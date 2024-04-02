import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from "../../../common/services/api.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: 'login.component.html',
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';

  constructor(private apiService: ApiService, private router: Router) {}

  /**
   * If the user is already authenticated, redirect them to the home page.
   */
  ngOnInit(): void {
    if (this.apiService.isAuthenticated()) {
      this.handleSuccessfulLogin();
    }
  }

  /**
   * Passes user provided credentials to th backend API and handle the authentication result.
   */
  onSubmit(): void {
    this.apiService.login(this.username, this.password).subscribe({
      next: () => {
        this.handleSuccessfulLogin();
      },
      error: () => {
        this.handleUnsuccessfulLogin();
      }
    });
  }

  /**
   * Redirects the user to the home page upon successful login.
   */
  handleSuccessfulLogin(): void {
    this.router.navigateByUrl('');
  }

  /**
   * Updates page content to alert the user their login was unsuccessful.
   */
  handleUnsuccessfulLogin(): void {
    alert('Could not authenticate.');
  }
}

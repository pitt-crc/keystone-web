import { CommonModule } from "@angular/common";
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from "@angular/router";

import { ApiService } from "../../../core/services/api.service";
import { LayoutCenterPageComponent } from "../../../layouts/components/layout-center-page/layout-center-page.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, LayoutCenterPageComponent],
  templateUrl: 'login.component.html',
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  submitButtonText: string = 'Sign In';
  submitButtonEnabled: boolean = true;
  showSubmitSpinner: boolean = false;

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
   * Pass user provided credentials to the backend API and handle the authentication result.
   */
  onSubmit(): void {
    this.disableSubmitButton();
    this.apiService.login(this.username, this.password).subscribe({
      next: (): void => {
        this.handleSuccessfulLogin();
      },
      error: (): void => {
        this.handleUnsuccessfulLogin();
      }
    });
    this.enableSubmitButton();
  }

  /**
   * Redirect the user to the home page upon successful login.
   */
  private handleSuccessfulLogin(): void {
    this.router.navigateByUrl('');
  }

  /**
   * Display a friendly error message indicating invalid login credentials
   */
  private handleUnsuccessfulLogin(): void {
    this.errorMessage = "Invalid credentials. Please try again.";
    this.password = "";
  }

  /**
   * Disable the login button and update it's content
   */
  private disableSubmitButton(): void {
    console.log('called');
    this.submitButtonEnabled = false;
    this.submitButtonText = 'Logging In...';
    this.showSubmitSpinner = true;
  }

  /**
   * Enable the login button and update it's content
   */
  private enableSubmitButton(): void {
    this.submitButtonEnabled = true;
    this.submitButtonText = 'Sign In';
    this.showSubmitSpinner = false;
  }
}

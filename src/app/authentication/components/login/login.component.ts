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
  username: string = '';
  password: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    if (this.apiService.isAuthenticated()) {
      this.handleSuccessfulLogin();
    }
  }

  onSubmit(): void {
    this.apiService.login(this.username, this.password).subscribe({
      next: this.handleSuccessfulLogin,
      error: this.handleUnsuccessfulLogin
    })
  }

  handleSuccessfulLogin(): void {
    this.router.navigateByUrl('');
  }

  handleUnsuccessfulLogin(): void {
    alert('Could not authenticate.');
  }
}

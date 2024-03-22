import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from "../../../common/services/api.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: 'login.component.html',
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private apiService: ApiService) {}

  onSubmit(): void {
    this.apiService.login(this.username, this.password).subscribe({
      next: this.handleSuccessfulLogin,
      error: this.handleUnsuccessfulLogin
    })
  }

  handleSuccessfulLogin(): void {
    alert('SUCCESS');
  }

  handleUnsuccessfulLogin(): void {
    alert('FAILURE');
  }
}

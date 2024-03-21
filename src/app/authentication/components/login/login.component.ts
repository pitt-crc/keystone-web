import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from "../../../common/services/api.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private apiService: ApiService) {}

  onSubmit(): void {
    console.log('submitted')
    this.apiService.login(this.username, this.password).subscribe({
      next: () => alert('SUCCESS'),
      error: () => alert('FAILURE')
    })
  }
}

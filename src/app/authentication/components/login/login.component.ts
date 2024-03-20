import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  onSubmit(): void {
    console.log('Form submitted');
    console.log('Username:', this.username);
    console.log('Password:', this.password);
  }
}

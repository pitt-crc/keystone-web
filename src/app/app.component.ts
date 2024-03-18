import { Component } from '@angular/core';
import { ApiService } from "./core/api.service";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private apiService: ApiService) {
    this.apiService.login('admin', 'admin')
    this.apiService.get('health/').subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error.error)
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ApiService } from "./core/api.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  apiVersion = "N/A"

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.fetchVersion();
  }

  fetchVersion(): void {
    this.apiService.versionGet().subscribe({
      next: (data: string) => {
        this.apiVersion = data;
      },
      error: (error) => {
        console.error('Error fetching API version:', error);
      }
    });
  }
}

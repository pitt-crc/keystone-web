import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from "./core/api.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  apiVersion: string = ""
  healthData: null | any[] = null

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchVersion();
    this.fetchHealthChecks();
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

  fetchHealthChecks(): void {
    this.apiService.healthGet().subscribe({
      next: (data) => {
        this.healthData = data.message;
      },
      error: (error) => {
        if ( error.status === 0 ) {
          // Handle connection failures separately
          console.log(error);
        } else {
          // Other errors should still contain health data indicating what is failing
          this.healthData = error.error;
        }
      }
    })
  }
}

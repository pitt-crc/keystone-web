import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { environment} from "../environments/environment";
import { HttpClient, HttpClientModule } from "@angular/common/http";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  httpClient = inject(HttpClient)

  apiVersion: string = ""

  ngOnInit(): void {
    this.getAPIVersion()
  }

  getAPIVersion(): void {
    const endpoint = environment.API_URL + '/version'
    this.httpClient.get(endpoint, {responseType: 'text'})
      .subscribe(
        (data: string) => {
          this.apiVersion = data
        }
      )
  }
}

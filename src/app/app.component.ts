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

  title: string = "Keystone";

  ngOnInit(): void {
    this.getAPIVersion()
  }

  getAPIVersion(): void {
    const endpoint = environment.API_URL + '/version/'
    console.log(endpoint)
    this.httpClient.get(endpoint)
      .subscribe(
        (data) => {
          console.log(data);
        }
      )
  }
}

import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../common/services/api.service";

@Component({
  selector: 'app-logout',
  standalone: true,
  templateUrl: './logout.component.html',
})
export class LogoutComponent implements OnInit{

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.logout()
  }

}

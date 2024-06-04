import { NgIf } from "@angular/common";
import { Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-settings-dropdown',
  standalone: true,
  templateUrl: './settings-dropdown.component.html',
  imports: [
    RouterLink,
    NgIf
  ],
  styleUrl: './settings-dropdown.component.scss'
})
export class SettingsDropdownComponent implements OnInit {
  notificationBadgeText?: string;

  ngOnInit(): void {
    this.notificationBadgeText = this.formatNumber(100);
  }

  private formatNumber(num: number): string {
    if (num > 99) {
      return "99+";
    }
    return num.toString();
  }
}

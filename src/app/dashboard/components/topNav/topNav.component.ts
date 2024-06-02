import { Component } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";

@Component({
  selector: 'app-topNav',
  standalone: true,
  templateUrl: 'topNav.component.html',
  imports: [
    NgOptimizedImage
  ],
  styleUrl: 'topNav.component.scss'
})
export class TopNavComponent {}

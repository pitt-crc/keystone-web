import { Component } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";

@Component({
  selector: 'app-top-nav',
  standalone: true,
  templateUrl: 'top-nav.component.html',
  imports: [
    NgOptimizedImage
  ],
  styleUrl: 'top-nav.component.scss'
})
export class TopNavComponent {}

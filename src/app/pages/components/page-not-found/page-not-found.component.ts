import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  templateUrl: 'page-not-found.component.html',
})
export class PageNotFoundComponent {

  constructor(private router: Router, private location: Location) {}

  /**
   * Navigate the user to the home page.
   */
  goHome(): void {
    this.router.navigateByUrl('');
  }

  /**
   * Navigate the user to the previous location in their browser history.
   */
  goBack(): void {
    this.location.back();
  }
}

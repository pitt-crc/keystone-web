import { Component } from '@angular/core';
import { Location } from '@angular/common';
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
   *
   * @returns A Promise that resolves to a boolean indicating if navigation was successful.
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

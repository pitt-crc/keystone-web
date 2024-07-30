import { NgClass, TitleCasePipe } from "@angular/common";
import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  templateUrl: './status-badge.component.html',
  imports: [
    NgClass,
    TitleCasePipe
  ]
})
export class StatusBadgeComponent implements OnChanges {
  @Input() status: string = "active";
  cssClass: string = 'bg-success';

  ngOnChanges() {
    this.cssClass = this.getClassForStatus(this.status);
  }

  /**
   * Return the CSS class corresponding to the provided status.
   *
   * @param status - The normalized status string.
   * @returns The CSS class as a string.
   */
  private getClassForStatus(status: string): string {
    const normalizedStatus: string = status.toLowerCase();
    switch (normalizedStatus) {
      case 'pending':
        return 'bg-secondary';
      case 'approved':
        return 'bg-warning';
      case 'active':
        return 'bg-success';
      case 'denied':
        return 'bg-danger';
      default:
        return '';
    }
  }
}

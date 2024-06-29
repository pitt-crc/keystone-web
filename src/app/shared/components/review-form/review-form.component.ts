import { DecimalPipe } from "@angular/common";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  imports: [
    FormsModule,
    DecimalPipe
  ],
  standalone: true
})
export class ReviewFormComponent {
  @Input() requestedResources: any[] = [];
  @Output() reviewSubmitted = new EventEmitter<any>();

  review = {
    status: 'approve',
    requestedResources: this.requestedResources,
    comments: ''
  };

  submitReview() {
    this.reviewSubmitted.emit(this.review);
  }
}

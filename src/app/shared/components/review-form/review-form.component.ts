import { DecimalPipe, NgForOf } from "@angular/common";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from "@angular/forms";

interface ReviewData {
  comments: string;
  computeResources: {
    cluster: string;
    requestedSu: number;
    awardedSu: number;
  }[];
  status: string;
}

@Component({
  selector: 'app-review-form',
  templateUrl: 'review-form.component.html',
  imports: [
    FormsModule,
    DecimalPipe,
    NgForOf
  ],
  standalone: true
})
export class ReviewFormComponent {
  @Input() requestedResources: any[] = [];
  @Output() reviewSubmitted: EventEmitter<ReviewData> = new EventEmitter<any>();

  formData: ReviewData = {
    status: 'approve',
    computeResources: this.requestedResources,
    comments: ''
  };

  submitReview(): void {
    this.reviewSubmitted.emit(this.formData);
  }
}

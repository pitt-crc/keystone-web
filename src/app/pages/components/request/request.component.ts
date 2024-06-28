import { DatePipe, DecimalPipe, NgClass, NgForOf, NgIf } from "@angular/common";
import { Component } from '@angular/core';

import { LayoutSideNavComponent } from "../../../layouts/components/layout-side-nav/layout-side-nav.component";

@Component({
  selector: 'app-RequestPage',
  standalone: true,
  templateUrl: 'request.component.html',
  imports: [LayoutSideNavComponent, NgClass, DatePipe, NgIf, NgForOf, DecimalPipe]
})
export class RequestComponent {
  requestTitle: string = "Rotational Energies In Nearby Satellite Galaxies";
  requestStatus: string = "Pending";
  requestID: number = 12345;
  requestGroup: string = "DJPerrefort";
  submitterGroup: string = "Daniel Perrefort";
  submitterDepartment: string = "Dept. of Physics and Astronomy";
  submitterPosition: string = "Faculty";
  requestDate: string = "2024-06-24";
  reviewedDate: string | null = null;
  startDate: string | null = null;
  endDate: string | null = null;

  clusterData = [
    {
      cluster: 'MPI',
      requestedSUs: 100000,
      awardedSUs: '--',
      utilization: 0
    },
    {
      cluster: 'SMP',
      requestedSUs: 150000,
      awardedSUs: '--',
      utilization: 0
    }
  ];
}


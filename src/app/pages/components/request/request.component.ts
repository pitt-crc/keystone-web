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
  // Request meta data
  requestTitle: string = "Rotational Energies In Nearby Satellite Galaxies";
  requestStatus: string = "Pending";
  requestID: number = 12345;
  requestGroup: string = "DJPerrefort";

  // Submitter data
  submitterGroup: string = "Daniel Perrefort";
  submitterDepartment: string = "Dept. of Physics and Astronomy";
  submitterPosition: string = "Faculty";

  // Dates
  requestDate: string = "2024-06-24";
  reviewDate: string | null = null;
  startDate: string | null = null;
  endDate: string | null = null;

  // Request content
  justification: string[] = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque iaculis tristique dolor, tincidunt auctor est aliquet ac. Vestibulum a feugiat turpis. Sed interdum lorem sed finibus facilisis. Nam sagittis, lacus a porta semper, lacus dolor dapibus eros, quis tempus velit sapien feugiat odio. Morbi a augue nec risus scelerisque pretium in vel neque. Curabitur fermentum neque in dolor egestas, sit amet vehicula nisi ultrices. Donec pulvinar, enim quis imperdiet pellentesque, mi mauris eleifend enim, et tempus tortor tellus quis tellus. Maecenas euismod diam id libero mollis, non auctor libero facilisis. Donec in metus magna. Suspendisse sit amet consectetur lacus. Maecenas nec convallis magna, consequat sodales nisi.",
    "Sed blandit venenatis dictum. Nulla sit amet urna id velit egestas aliquet. Fusce sodales odio diam, at auctor ex sodales id. Nullam facilisis massa eu sem pharetra pharetra. Aliquam in laoreet metus. Vivamus porta dolor at eros efficitur varius. Pellentesque tortor lectus, porttitor nec elit sed, malesuada aliquet massa. Maecenas vel nisi dignissim, fringilla odio ut, varius nisl. Suspendisse nisi purus, fermentum a finibus a, facilisis id nisi. Morbi tincidunt, nibh ac dignissim accumsan, nulla eros tristique nisi, vitae accumsan ante ipsum in lorem. Mauris rhoncus commodo massa nec efficitur. Cras orci dolor, imperdiet vitae augue et, auctor luctus leo. Aenean a risus quis lacus finibus semper eget eget ante. In dapibus ipsum quis turpis condimentum finibus."
  ]
  requestedResources = [
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
  attachments = [
    {
      name: 'attachment1.pdf',
      url: '#'
    },
    {
      name: 'attachment2.pdf',
      url: '#'
    },
  ]

  // Reviewer data
  comments = [
    {
      author: 'Gerald Ford',
      dateTime: 'June 20th, 3:45 PM',
      content: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque iaculis tristique dolor, tincidunt auctor est aliquet ac. Vestibulum a feugiat turpis. Sed interdum lorem sed finibus facilisis. Nam sagittis, lacus a porta semper, lacus dolor dapibus eros, quis tempus velit sapien feugiat odio. Morbi a augue nec risus scelerisque pretium in vel neque. Curabitur fermentum neque in dolor egestas, sit amet vehicula nisi ultrices. Donec pulvinar, enim quis imperdiet pellentesque, mi mauris eleifend enim, et tempus tortor tellus quis tellus. Maecenas euismod diam id libero mollis, non auctor libero facilisis. Donec in metus magna. Suspendisse sit amet consectetur lacus. Maecenas nec convallis magna, consequat sodales nisi.',]
    },
    {
      author: 'Gerald Ford',
      dateTime: 'June 20th, 3:45 PM',
      content: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque iaculis tristique dolor, tincidunt auctor est aliquet ac. Vestibulum a feugiat turpis. Sed interdum lorem sed finibus facilisis. Nam sagittis, lacus a porta semper, lacus dolor dapibus eros, quis tempus velit sapien feugiat odio. Morbi a augue nec risus scelerisque pretium in vel neque. Curabitur fermentum neque in dolor egestas, sit amet vehicula nisi ultrices. Donec pulvinar, enim quis imperdiet pellentesque, mi mauris eleifend enim, et tempus tortor tellus quis tellus. Maecenas euismod diam id libero mollis, non auctor libero facilisis. Donec in metus magna. Suspendisse sit amet consectetur lacus. Maecenas nec convallis magna, consequat sodales nisi.',]
    }
  ];
}


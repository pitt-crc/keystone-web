import { Component } from '@angular/core';

import { LayoutSideNavComponent } from "../../../layouts/components/layout-side-nav/layout-side-nav.component";

@Component({
  selector: 'app-RequestPage',
  standalone: true,
  templateUrl: 'request.component.html',
  imports: [LayoutSideNavComponent]
})
export class RequestComponent {}

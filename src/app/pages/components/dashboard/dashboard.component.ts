import { Component } from '@angular/core';

import { LayoutSideNavComponent } from "../../../layouts/components/layout-side-nav/layout-side-nav.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: 'dashboard.component.html',
  imports: [LayoutSideNavComponent]
})
export class DashboardComponent {}

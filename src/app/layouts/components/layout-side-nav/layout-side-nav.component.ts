import { Component } from '@angular/core';

import { SideNavComponent } from "../../../shared/components/side-nav/side-nav.component";
import { TopNavComponent } from "../../../shared/components/top-nav/top-nav.component";

@Component({
  selector: 'app-layout-side-nav',
  standalone: true,
  imports: [TopNavComponent, SideNavComponent],
  templateUrl: 'layout-side-nav.component.html',
  styleUrl: 'layout-side-nav.component.scss'
})
export class LayoutSideNavComponent {}

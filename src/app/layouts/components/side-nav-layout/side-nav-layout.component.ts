import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";

import { SideNavComponent } from "../../../shared/components/side-nav/side-nav.component";
import { TopNavComponent } from "../../../shared/components/top-nav/top-nav.component";

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, TopNavComponent, SideNavComponent],
  templateUrl: 'side-nav-layout.component.html',
  styleUrl: 'side-nav-layout.component.scss'
})
export class SideNavLayoutComponent {}

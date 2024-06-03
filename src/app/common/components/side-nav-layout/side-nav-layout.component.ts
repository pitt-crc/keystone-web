import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { TopNavComponent } from "../top-nav/top-nav.component";
import { SideNavComponent } from "../side-nav/side-nav.component";

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, TopNavComponent, SideNavComponent],
  templateUrl: 'side-nav-layout.component.html',
  styleUrl: 'side-nav-layout.component.scss'
})
export class SideNavLayoutComponent {}

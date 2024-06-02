import { Component } from '@angular/core';

import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-sideNav',
  standalone: true,
  templateUrl: 'sideNav.component.html',
  styleUrl: 'sideNav.component.scss'
})
export class SideNavComponent {
  version: string = environment.version;
}

import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { KeyValuePipe, NgForOf } from "@angular/common";

@Component({
  selector: 'app-topNav',
  standalone: true,
  imports: [RouterOutlet, KeyValuePipe, NgForOf],
  templateUrl: 'topNav.component.html',
  styleUrl: 'topNav.component.scss'
})
export class TopNavComponent {}

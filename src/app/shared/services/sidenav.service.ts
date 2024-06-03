import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {
  private sidebarVisible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  sidebarVisible$: Observable<boolean> = this.sidebarVisible.asObservable();

  toggleSidebar(): void {
    this.sidebarVisible.next(!this.sidebarVisible.value);
  }
}

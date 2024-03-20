import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ApiService } from '../../common/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateFn {

  constructor(private apiService: ApiService, private router: Router) {}

  canActivate(): boolean {
    if (this.apiService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

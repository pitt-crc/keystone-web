import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../services/api.service';

export const authGuard = () => {
  const apiService: ApiService = inject(ApiService);
  const router: Router = inject(Router);
  return apiService.isAuthenticated() || router.parseUrl('/auth/login');
};

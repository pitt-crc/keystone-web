import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../common/services/api.service';

export const authGuard = () => {
  const apiService = inject(ApiService);
  const router = inject(Router);
  return apiService.isAuthenticated() || router.parseUrl('/auth/login');
};

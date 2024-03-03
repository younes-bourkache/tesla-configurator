import { CanActivateFn, Router } from '@angular/router';
import { ConfigService } from '../../services/config.service';
import { inject } from '@angular/core';

export const summaryGuard: CanActivateFn = () => {
  const configService = inject(ConfigService);
  const router = inject(Router);
  if (configService.isModelAndColorSelected() && configService.isConfSelected()) {
    return true;
  }
  return router.createUrlTree(['/models']);
};

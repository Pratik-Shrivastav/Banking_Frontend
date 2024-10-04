import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);  // Inject AuthService
  const router = inject(Router);            // Inject Router

  const expectedRole = route.data['role'];   // Get the required role from route data

  // Check if the user is authenticated and has the required role
  if (authService.isAuthenticated() && authService.hasRole(expectedRole)) {
    
    return true;
  } else {
    console.log(expectedRole);

    console.log("Role not match")
    router.navigate(['/Login']);  // Redirect to login if not authorized
    return false;
  }
};

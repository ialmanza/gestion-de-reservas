import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RolesService } from '../services/roles.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private rolesService: RolesService, private router: Router) {}

  canActivate(): boolean {
    const userRole = localStorage.getItem('currentUserRole');
    if (userRole === 'administrador') {
      return true;
    }
    // Redirigir si no tiene acceso
    this.router.navigate(['/access-denied']);
    return false;
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RolesService } from '../services/roles.service';
import { AuthService } from '../components/Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private rolesService: RolesService, private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    const userRole = localStorage.getItem('currentUserRole');
    if (userRole === 'administrador') {
      return true;
    }

    this.router.navigate(['/access-denied']);
    return false;

    // TRABAJANDO PARA ELIMINAR EL USO DEL localStorage COMPLETAMENTE, EN DESARROLLO

    // const email = localStorage.getItem('currentUserEmail');
    // if (email) {
    //   this.authService.fetchUserRole(email).then((role: string | null) => {
    //     if (role && role === 'administrador') {
    //       console.log(`Rol del usuario: ${role}`);
    //       return true; // Add this line
    //     }
    //     return false; // Add this line
    //   });
    // }
    // this.router.navigate(['/access-denied']);
    // return false;
  }
}


import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private rolesKey = 'roles'; // Clave para guardar roles en localStorage
  private rolesSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.getRolesFromStorage());

  constructor() {}

  // Obtener los roles desde localStorage
  getRolesFromStorage(): any[] {
    const rolesData = localStorage.getItem(this.rolesKey);
    return rolesData ? JSON.parse(rolesData) : [];
  }


  saveRolesToStorage(roles: any[]): void {
    localStorage.setItem(this.rolesKey, JSON.stringify(roles));
  }


  getRoles() {
    return this.rolesSubject.asObservable();
  }


  addRole(newRole: any): void {
    const roles = this.getRolesFromStorage();
    newRole.password = this.encryptPassword(newRole.password);  // Encriptar la contraseña
    roles.push(newRole);
    this.saveRolesToStorage(roles);
    this.rolesSubject.next(roles); // Guardar el cambio
  }


  deleteRole(email: string): void {
    let roles = this.getRolesFromStorage();
    roles = roles.filter(role => role.email !== email);
    this.saveRolesToStorage(roles);
    this.rolesSubject.next(roles);
  }


  updateRole(updatedRole: any): void {
    const roles = this.getRolesFromStorage();
    const index = roles.findIndex(role => role.email === updatedRole.email);
    if (index !== -1) {
      roles[index] = updatedRole;
      this.saveRolesToStorage(roles);
      this.rolesSubject.next(roles);
    }
  }

  encryptPassword(password: string): string {
    return CryptoJS.SHA256(password).toString();
  }


  isEmailValid(email: string): boolean {
    const roles = this.getRolesFromStorage();
    return roles.some(user => user.email === email);
  }

  updatePassword(email: string, newPassword: string): boolean {
    const roles = this.getRolesFromStorage();
    const userIndex = roles.findIndex(user => user.email === email);

    if (userIndex !== -1) {
      roles[userIndex].password = this.encryptPassword(newPassword);  // Encriptar la nueva contraseña
      this.saveRolesToStorage(roles);
      return true;
    }
    return false;
  }
}

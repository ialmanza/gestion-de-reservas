import { RolesService } from './../../services/roles.service';
import { SignInWithPasswordCredentials, SignUpWithPasswordCredentials } from '@supabase/supabase-js';
import { Injectable, inject } from '@angular/core';
import { SupabaseService } from '../../shared/data-acces/supabase.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { RolesBdService } from '../../services/roles-bd.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _supabaseClient = inject(SupabaseService).supabaseClient;


  private authStateSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  authState: Observable<boolean> = this.authStateSubject.asObservable();

  constructor(private rolesService: RolesService, private rolesBdService: RolesBdService) {

  }

  private isAuthenticated(): boolean {
    const usuariologueado = localStorage.getItem('usuariologueado');
    return usuariologueado === 'true';
  }

  session() {
    return this._supabaseClient.auth.getSession();
  }

  async signUp(credentials: SignUpWithPasswordCredentials): Promise<any> {
    try {
      const { data, error } = await this._supabaseClient.auth.signUp(credentials);
      if (error) throw error;

     localStorage.setItem('usuariologueado', 'true');
      localStorage.setItem('currentUserEmail', data.user?.email ?? '');

      this.authStateSubject.next(true);
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error en el registro:', error.message);
        return { error };
      } else {
        console.error('Unknown error:', error);
        return { error };
      }
    }
  }


  async logIn(credentials: SignInWithPasswordCredentials): Promise<any> {
    try {
      const { data, error } = await this._supabaseClient.auth.signInWithPassword(credentials);
      if (error) throw error;

      localStorage.setItem('usuariologueado', 'true');
      localStorage.setItem('currentUserEmail', data.user?.email ?? '');

      const role = await this.fetchUserRole(data.user?.email!);
      if (role) {
        localStorage.setItem('currentUserRole', role);
      } else {
        console.warn('No se encontró rol para el usuario');
      }

      this.authStateSubject.next(true);
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error en el inicio de sesión:', error.message);
        return { error };
      } else {
        console.error('Unknown error:', error);
        return { error };
      }
    }
  }


  signOut(): void {
    localStorage.removeItem('usuariologueado');
    localStorage.removeItem('currentUserEmail');
    localStorage.removeItem('currentUserRole');
    localStorage.removeItem('sb-fdqcganrmqgepkxgkugn-auth-token');
    this.authStateSubject.next(false);
    this._supabaseClient.auth.signOut();
  }


  async fetchUserRole(email: string): Promise<string | null> {
    return this.rolesBdService.getRoleByEmail(email);
  }

}


import { RolesService } from './../../services/roles.service';
// import { SignInWithPasswordCredentials, SignUpWithPasswordCredentials, SupabaseClient } from '@supabase/supabase-js';
// import {Injectable, inject} from '@angular/core';
// import { SupabaseService } from '../../shared/data-acces/supabase.service';
// import { BehaviorSubject, Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private _supabaseClient = inject(SupabaseService).supabaseClient;

//   private authStateSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
//   authState: Observable<boolean> = this.authStateSubject.asObservable();


//   private isAuthenticated(): boolean {
//     const usuariologueado = localStorage.getItem('usuariologueado');
//     return usuariologueado === 'true';
//   }

//   session( ) {
//     return this._supabaseClient.auth.getSession();

//   }

//   singUp(credentials: SignUpWithPasswordCredentials) {
//     localStorage.setItem('usuariologueado','true');
//     this.authStateSubject.next(true);
//     return this._supabaseClient.auth.signUp(credentials);
//   }

//   logIn(credentials: SignInWithPasswordCredentials) {
//     localStorage.setItem('usuariologueado','true');
//     this.authStateSubject.next(true);
//     return this._supabaseClient.auth.signInWithPassword(credentials);
//   }

//   signOut() {
//     localStorage.removeItem('usuariologueado');
//     localStorage.removeItem('sb-fdqcganrmqgepkxgkugn-auth-token'); // Quita el token del localstorage
//     this.authStateSubject.next(false);
//     this._supabaseClient.auth.signOut();
//   }


// }

//}

//---------------------------------------------------------------------------------------------------------------------------------------------------------


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


  //Determina si el usuario está autenticado
  private isAuthenticated(): boolean {
    const usuariologueado = localStorage.getItem('usuariologueado');
    return usuariologueado === 'true';
  }

  //Obtener sesión actual del usuario (si existe)
  session() {
    return this._supabaseClient.auth.getSession();
  }

  //Registro de usuario
  async signUp(credentials: SignUpWithPasswordCredentials): Promise<any> {
    try {
      const { data, error } = await this._supabaseClient.auth.signUp(credentials);
      if (error) throw error;

      //Guarda el usuario como logueado y actualiza el estado
     localStorage.setItem('usuariologueado', 'true');
      localStorage.setItem('currentUserEmail', data.user?.email ?? ''); // Guarda el email del usuario

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

  //Inicio de sesión
  async logIn(credentials: SignInWithPasswordCredentials): Promise<any> {
    try {
      const { data, error } = await this._supabaseClient.auth.signInWithPassword(credentials);
      if (error) throw error;

      // Guarda el usuario como logueado y actualiza el estado
      localStorage.setItem('usuariologueado', 'true');
      localStorage.setItem('currentUserEmail', data.user?.email ?? '');

      // Obtener y almacenar el rol del usuario
      const role = await this.fetchUserRole(data.user?.email!);
      if (role) {
        localStorage.setItem('currentUserRole', role); // Guarda el rol del usuario
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


  //Cerrar sesión
  signOut(): void {
    localStorage.removeItem('usuariologueado');
    localStorage.removeItem('currentUserEmail');
    localStorage.removeItem('currentUserRole');
    localStorage.removeItem('sb-fdqcganrmqgepkxgkugn-auth-token');
    this.authStateSubject.next(false);
    this._supabaseClient.auth.signOut();
  }

  //Obtener el rol del usuario desde una fuente externa

  async fetchUserRole(email: string): Promise<string | null> {
    return this.rolesBdService.getRoleByEmail(email);
  }

}


import { Injectable, computed, inject, signal } from '@angular/core';
import { SupabaseService } from '../shared/data-acces/supabase.service';
import { AuthService } from '../components/Auth/auth.service';


interface Role {
  id?: string;
  nombre: string;
  apellido: string;
  email: string;
  rol: string;
}

export interface RolesStates {
  roles: Role[];
  loading: boolean;
  error: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class RolesBdService {
  private _supabaseClient=inject(SupabaseService).supabaseClient

  private _state = signal<RolesStates>({
    roles: [],
    loading: true,
    error: false
  });

  //Selectores
  roles = computed(() => this._state().roles);
  loading = computed(() => this._state().loading);
  error = computed(() => this._state().error);



  constructor() {
    this.getRolesDB();
   }

  async getRolesDB(): Promise<Role[]> {
    try{
      this._state.update(state => ({ ...state, loading: true }));
      const { data } = await this._supabaseClient
      .from('roles-reservas')
        .select()
        .returns<Role[]>();

        if (data && data.length > 0) {
          this._state.update(state => ({ ...state, roles: data }));
          return data;
        }
        return [];
    } catch (error) {
      this._state.update(state => ({ ...state, error: true }));
      return [];
    } finally {
      this._state.update(state => ({ ...state, loading: false }));
    }

   }


  async getRoleByEmail(email: string): Promise<string | null> {
    try {
      const { data, error } = await this._supabaseClient
        .from('roles-reservas')
        .select('rol')
        .eq('email', email)
        .single();

      if (error) {
        console.error('Error fetching user role:', error);
        return null;
      }

      return data?.rol || null;
    } catch (error) {
      console.error('Error fetching user role:', error);
      return null;
    }
  }

  async insertarUsuarioDB(usserRole:{nombre: string, apellido: string, email: string, rol: string}): Promise<void> {
    try {
      await this._supabaseClient
      const response = await this._supabaseClient.from('roles-reservas').insert({
        nombre: usserRole.nombre,
        apellido: usserRole.apellido,
        email: usserRole.email,
        rol: usserRole.rol
      });
    } catch (error) {
      console.error('Error inserting user:', error);
    }
  }

  async editarRolDB(perroDB: Role) {
    try {
      const response = await this._supabaseClient.from('roles-reservas').update({
        ...perroDB
      }).eq('email', perroDB.email);
      this.getRolesDB();
    } catch (error) {
      this._state.update(state => ({ ...state, error: true }));
    }
  }

   async eliminarRolDb(email: string) {
    try {
      const response = await this._supabaseClient.from('roles-reservas').delete().eq('email', email);
      this.getRolesDB();
    } catch (error) {
      this._state.update(state => ({ ...state, error: true }));
    }
  }

}

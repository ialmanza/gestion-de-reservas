import { Injectable, computed, inject, signal } from '@angular/core';
import { SupabaseService } from '../shared/data-acces/supabase.service';
import { AuthService } from '../components/Auth/auth.service';


interface Role {
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
  //private _authService = inject(AuthService);

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
        //.eq('user_id', session?.user.id) // Comentar si se quieren todos los datos
        .returns<Role[]>();

        if (data && data.length > 0) {
          this._state.update(state => ({ ...state, roles: data }));
          return data; // Retorna los datos obtenidos
        }
        return []; // Retorna un array vacío si no hay datos
    } catch (error) {
      this._state.update(state => ({ ...state, error: true }));
      return []; // Retorna un array vacío en caso de error
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

      return data?.rol || null; // Retorna el rol o null si no existe
    } catch (error) {
      console.error('Error fetching user role:', error);
      return null; // Retorna null en caso de error
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


}

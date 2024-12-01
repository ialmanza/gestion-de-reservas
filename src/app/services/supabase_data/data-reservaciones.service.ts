import { Injectable, computed, inject, signal } from '@angular/core';
import { SupabaseService } from '../../shared/data-acces/supabase.service';
import { BehaviorSubject } from 'rxjs';

export interface ReservaDB {
  id?: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  fecha: string;
  hora: string;
  persona: number;
  codigo_reserva: string;
  tipo_comida: string;
  observaciones: string;
}

export interface ReservaStates  {
  reservas: ReservaDB[];
  loading: boolean;
  error: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DataReservacionesService {
  private _supabaseClient=inject(SupabaseService).supabaseClient
  private reservadbSubject: BehaviorSubject<ReservaDB[]> = new BehaviorSubject<ReservaDB[]>([])

  private _state = signal<ReservaStates>({
    reservas: [],
    loading: true,
    error: false
  })

  reservas = computed(() => this._state().reservas)
  loading = computed(() => this._state().loading)
  error = computed(() => this._state().error)

  constructor() { }

  async getAllReservasDB(): Promise<ReservaDB[]> {
    try {
      this._state.update(state => ({ ...state, loading: true }));
      const { data } = await this._supabaseClient
        .from('reservaciones')
        .select()
        .returns<ReservaDB[]>();

      if (data && data.length > 0) {
        this._state.update(state => ({ ...state, reservas: data }));
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

  async createItem(item: ReservaDB): Promise<void> {
    try {
      const response = await this._supabaseClient.from('reservaciones').insert(item);
    } catch (error) {
      this._state.update(state => ({ ...state, error: true }));
    }
  }

   async insertReservaDB(reservaDB: ReservaDB): Promise<void> {
    try {
      const response = await this._supabaseClient.from('reservaciones').insert({
        ...reservaDB,
      });

      this._state.update((state) => ({
        ...state,
        reservas: [...state.reservas, reservaDB],
      }));
    } catch (error) {
      this._state.update((state) => ({ ...state, error: true }));
    }
  }

  async editReservaDB(reservaDB: Partial<ReservaDB>, id: string): Promise<void> {
    try {
      const response = await this._supabaseClient
        .from('reservaciones')
        .update({
          ...reservaDB,
        })
        .eq('codigo_reserva', id);

      await this.getAllReservasDB();
    } catch (error) {
      this._state.update((state) => ({ ...state, error: true }));
    }
  }

  async deleteReservaDB(id: string): Promise<void> {
    try {
      const response = await this._supabaseClient
        .from('reservaciones')
        .delete()
        .eq('codigo_reserva', id);

      await this.getAllReservasDB();
    } catch (error) {
      this._state.update((state) => ({ ...state, error: true }));
    }
  }

}

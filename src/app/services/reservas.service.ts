import { Injectable } from '@angular/core';
import { Reserva } from '../models/Ireserva';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  private reservasSubject: BehaviorSubject<Reserva[]> = new BehaviorSubject<Reserva[]>([])

  constructor() {
    this.loadReservasFromLocalStorage();
   }


   getReservas():Observable<Reserva[]> {
    return this.reservasSubject.asObservable();

   }

   addReserva(reserva : Reserva) {
    const storedReservas = this.getReservasFromLocalStorage();
    storedReservas.push(reserva);
    this.saveReservasToLocalStorage(storedReservas);
    this.reservasSubject.next(storedReservas);
   }

   deleteReserva(id: string) {
    let storedReservas = this.getReservasFromLocalStorage();
    storedReservas = storedReservas.filter((reserva: { id: string; }) => reserva.id !== id);
    this.saveReservasToLocalStorage(storedReservas);
    this.reservasSubject.next(storedReservas);

  }

  private loadReservasFromLocalStorage() {
    const storedReservas = this.getReservasFromLocalStorage();
    this.reservasSubject.next(storedReservas);
  }

  private getReservasFromLocalStorage(): Reserva[] {
    const storedReservas = localStorage.getItem('reservas');
    return storedReservas ? JSON.parse(storedReservas) : [];
  }

  private saveReservasToLocalStorage(reservas: Reserva[]) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('reservas', JSON.stringify(reservas));
    } else {
      console.warn('localStorage no disponible.');
    }
  }

  updateReserva(updatedReserva: Reserva) {
    let storedReservas = this.getReservasFromLocalStorage();
    const index = storedReservas.findIndex(reserva => reserva.id === updatedReserva.id);
    if (index !== -1) {
      storedReservas[index] = updatedReserva;
        this.saveReservasToLocalStorage(storedReservas);
        this.reservasSubject.next(storedReservas);
    } else {
        console.error('Reserva no encontrada.');
    }
  }


}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Reserva } from '../models/Ireserva';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://maxipanza.com/reservations/';

  constructor(private http: HttpClient) { }

  // Método para obtener todas las reservas
  getItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Método para obtener una reserva por ID
  getReservaByCodigo(id: string): Observable<any> {
    return this.http.get<Reserva>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Método para crear una nueva reserva
  createItem(item: any): Observable<any> {
    return this.http.post(this.apiUrl, item).pipe(
      catchError(this.handleError)
    );
  }

  updateReserva(payload: any, reservationId: string): Observable<any> {
    const url = `https://maxipanza.com/reservations/${reservationId}/`;
    return this.http.put(url, payload);
  }


  // Método para eliminar una reserva específica usando su código de reserva
  deleteItem(codigo_reserva: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}${codigo_reserva}/`).pipe(
      catchError(this.handleError)
    );
  }

  // Método para obtener una reserva por ID con procesamiento adicional
  getReservaById(id: string): Observable<Reserva | null> {
    return this.getItems().pipe(
      map(items => items.find(reserva => reserva.id === id) || null),
      catchError(this.handleError)
    );
  }

  // Método para obtener la última reserva
  getLastReservation(): Observable<Reserva | null> {
    return this.getItems().pipe(
      map(reservas => reservas.length > 0 ? reservas[reservas.length - 1] : null),
      catchError(this.handleError)
    );
  }

  // Manejo de errores para capturar y procesar el mensaje del backend
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error inesperado';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = error.error.message || 'No se pudo procesar la solicitud';
    }
    return throwError(() => new Error(errorMessage));
  }
}

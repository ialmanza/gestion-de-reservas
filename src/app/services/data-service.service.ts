// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { map, Observable, of } from 'rxjs';
// import { Reserva } from '../models/Ireserva';

// @Injectable({
//   providedIn: 'root'
// })
// export class DataService {
//   private apiUrl = 'https://maxipanza.com/reservations/'; // Reemplazar  la URL de la API

//   constructor(private http: HttpClient) { }

//   getItems(): Observable<any[]> {
//     return this.http.get<any[]>(this.apiUrl);
//   }

//   getItem(id: number): Observable<any> {
//     return this.http.get(`${this.apiUrl}/${id}`);
//   }

//   createItem(item: any): Observable<any> {
//     return this.http.post(this.apiUrl, item);
//   }

//   updateItem(id: number, item: any): Observable<any> {
//     const header = new HttpHeaders({
//       'Content-Type': 'application/json'
//     });
//     return this.http.post(`${this.apiUrl}/${id}`, item, { headers: header });
//   }

//   // deleteItem(id: number): Observable<void> {
//   //   const header = new HttpHeaders({
//   //     'Content-Type': 'application/json'
//   //   });
//   //   console.log(`${this.apiUrl}/${id}`);
//   //   return this.http.delete<void>(`${this.apiUrl}${id}/`);
//   // }

//   deleteItem(id: number): Observable<void> {
//     const header = new HttpHeaders({
//       'Content-Type': 'application/json'
//     });

//     // Asegúrate de que la URL tenga una barra al final
//     const url = `${this.apiUrl.endsWith('/') ? this.apiUrl : this.apiUrl + '/'}${id}`;
//     console.log(url);

//     return this.http.delete<void>(url, { headers: header });
//   }

//   cancelReservation(codigo_reserva: string){

//     // const header = new HttpHeaders({
//     //   'Content-Type': 'application/json'
//     // });

//     return this.http.delete(`${this.apiUrl}${codigo_reserva}`);
//   }

//   getReservaById(id: string): Observable<Reserva | null> {
//     return this.getItems().pipe(
//       map(items => items.find(reserva => reserva.id === id) || null)
//     );
//   }


//   getLastReservation(): Observable<Reserva | null> {
//     return this.getItems().pipe(
//       map(reservas => reservas.length > 0 ? reservas[reservas.length - 1] : null)
//     );
//   }

// }



import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Reserva } from '../models/Ireserva';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://maxipanza.com/reservations/'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) { }

  // Método para obtener todas las reservas
  getItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Método para obtener una reserva por ID
  getItem(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Método para crear una nueva reserva
  createItem(item: any): Observable<any> {
    return this.http.post(this.apiUrl, item).pipe(
      catchError(this.handleError)
    );
  }

  // Método para actualizar una reserva existente
  updateItem(id: number, item: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(`${this.apiUrl}/${id}`, item, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Método para eliminar una reserva
  deleteItem(id: number): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const url = `${this.apiUrl.endsWith('/') ? this.apiUrl : this.apiUrl + '/'}${id}`;
    return this.http.delete<void>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Método para cancelar una reserva específica usando su código de reserva
  cancelReservation(codigo_reserva: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}${codigo_reserva}`).pipe(
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
      // Error de cliente o de red
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del backend
      errorMessage = error.error.message || 'No se pudo procesar la solicitud';
    }
    return throwError(() => new Error(errorMessage));
  }
}

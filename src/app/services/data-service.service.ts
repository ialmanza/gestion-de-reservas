import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { Reserva } from '../models/Ireserva';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://maxipanza.com/reservations/'; // Reemplazar  la URL de la API

  constructor(private http: HttpClient) { }

  getItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getItem(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createItem(item: any): Observable<any> {
    return this.http.post(this.apiUrl, item);
  }

  updateItem(id: number, item: any): Observable<any> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.apiUrl}/${id}`, item, { headers: header });
  }

  // deleteItem(id: number): Observable<void> {
  //   const header = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });
  //   console.log(`${this.apiUrl}/${id}`);
  //   return this.http.delete<void>(`${this.apiUrl}${id}/`);
  // }

  deleteItem(id: number): Observable<void> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Asegúrate de que la URL tenga una barra al final
    const url = `${this.apiUrl.endsWith('/') ? this.apiUrl : this.apiUrl + '/'}${id}`;
    console.log(url);

    return this.http.delete<void>(url, { headers: header });
  }

  cancelReservation(codigo_reserva: string){

    // const header = new HttpHeaders({
    //   'Content-Type': 'application/json'
    // });

    return this.http.delete(`${this.apiUrl}${codigo_reserva}`);
  }

  getReservaById(id: string): Observable<Reserva | null> {
    return this.getItems().pipe(
      map(items => items.find(reserva => reserva.id === id) || null)
    );
  }


  getLastReservation(): Observable<Reserva | null> {
    return this.getItems().pipe(
      map(reservas => reservas.length > 0 ? reservas[reservas.length - 1] : null)
    );
  }

}

import { Component } from '@angular/core';
import { ReservaNuevaComponent } from "../reserva-nueva/reserva-nueva.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataReservacionesService, ReservaDB } from '../../../services/supabase_data/data-reservaciones.service';

@Component({
  selector: 'app-reservas-list',
  standalone: true,
  imports: [ReservaNuevaComponent, CommonModule, FormsModule],
  providers: [ DataReservacionesService],
  templateUrl: './reservas-list.component.html',
  styleUrl: './reservas-list.component.css'
})

export class ReservasListComponent {
  reservas : ReservaDB[] = [];
  filteredReservas: ReservaDB[] = [];
  searchTerm: string = '';

  constructor( private dataReservacionesService: DataReservacionesService) {
    this.reservas = [];
  }

  ngOnInit(): void {
    this.dataReservacionesService.getAllReservasDB().then(reservas => {
      this.reservas = reservas;
      this.filteredReservas = this.reservas;
    })
  }

  filter(query: string) {
    this.filteredReservas = this.reservas.filter(reserva => {
      const reservaId = reserva.id ? reserva.id.toString().toLowerCase() : '';
      const reservaEmail = reserva.email ? reserva.email.toLowerCase() : '';
      const reservaNombre = reserva.nombre ? reserva.nombre.toLowerCase() : '';
      const reservaCodigo = reserva.codigo_reserva ? reserva.codigo_reserva.toLowerCase() : '';

      return reservaId.includes(query.toLowerCase()) || reservaEmail.includes(query.toLowerCase()) || reservaNombre.includes(query.toLowerCase()) || reservaCodigo.includes((query.toLowerCase() || ''));
  });
  }

}

import { Component } from '@angular/core';
import { ReservaNuevaComponent } from "../reserva-nueva/reserva-nueva.component";
import { ReservasService } from '../../../services/reservas.service';
import { Reserva } from '../../../models/Ireserva';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../../services/data-service.service';

@Component({
  selector: 'app-reservas-list',
  standalone: true,
  imports: [ReservaNuevaComponent, CommonModule, FormsModule],
  providers: [ReservasService, DataService],
  templateUrl: './reservas-list.component.html',
  styleUrl: './reservas-list.component.css'
})

export class ReservasListComponent {
  reservas : Reserva[];
  filteredReservas: Reserva[] = [];
  searchTerm: string = '';

  constructor( private reservasService: ReservasService, private dataService: DataService) {
    this.reservas = [];
  }

  ngOnInit(): void {
    //this.reservasService.getReservas().subscribe((reservas : Reserva[]) => {
      this.dataService.getItems().subscribe((reservas : Reserva[]) => {
      this.reservas = reservas
      this.filteredReservas = this.reservas
    });
  }

  filter(query: string) {
    this.filteredReservas = this.reservas.filter(reserva => {
      const reservaId = reserva.id ? reserva.id.toString().toLowerCase() : '';
      const reservaEmail = reserva.email ? reserva.email.toLowerCase() : '';
      const reservaApellidos = reserva.apellidos ? reserva.apellidos.toLowerCase() : '';

      return reservaId.includes(query.toLowerCase()) || reservaEmail.includes(query.toLowerCase()) || reservaApellidos.includes(query.toLowerCase());
  });
  }

}

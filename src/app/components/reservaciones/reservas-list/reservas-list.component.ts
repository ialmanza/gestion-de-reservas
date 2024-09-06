import { Component } from '@angular/core';
import { ReservaNuevaComponent } from "../reserva-nueva/reserva-nueva.component";
import { ReservasService } from '../../../services/reservas.service';
import { Reserva } from '../../../models/Ireserva';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservas-list',
  standalone: true,
  imports: [ReservaNuevaComponent, CommonModule],
  templateUrl: './reservas-list.component.html',
  styleUrl: './reservas-list.component.css'
})
export class ReservasListComponent {
  reservas : Reserva[];

  constructor( private reservasService: ReservasService) {
    this.reservas = [];
  }

  ngOnInit(): void {
    this.reservasService.getReservas().subscribe((reservas : Reserva[]) => {
      this.reservas = reservas
    });
  }


}

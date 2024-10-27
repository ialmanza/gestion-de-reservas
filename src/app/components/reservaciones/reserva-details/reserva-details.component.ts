import { Component, OnInit } from '@angular/core';
import { Reserva } from '../../../models/Ireserva';
import { DataService } from '../../../services/data-service.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reserva-details',
  standalone: true,
  imports: [ CommonModule],
  providers: [DataService],
  templateUrl: './reserva-details.component.html',
  styleUrl: './reserva-details.component.css'
})
export class ReservaDetailsComponent {

  lastReserva: Reserva | null = null;
  errorMessage: string | null = null;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.getLastReserva();
  }

  getLastReserva(): void {
    this.dataService.getLastReservation().subscribe(
      (reserva: Reserva | null) => {
        this.lastReserva = reserva;
      },
      (error) => {
        this.errorMessage = 'Error al obtener la última reserva';
        console.error(error);
      }
    );
  }

  reiniciarFormulario() {
    this.router.navigate(['/form-reservas']);
  }
}

import { Component } from '@angular/core';
import { ReservasService } from '../../../services/reservas.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataService } from '../../../services/data-service.service';

@Component({
  selector: 'app-cancelar-reservacion',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, FormsModule ],
  providers: [ReservasService, DataService],
  templateUrl: './cancelar-reservacion.component.html',
  styleUrl: './cancelar-reservacion.component.css'
})
export class CancelarReservacionComponent {
  reservationId: string = '';
  email: string = '';
  message: string = '';
  success: boolean = false;

  constructor(private reservasService: ReservasService, private dataService: DataService) {}

  onSubmit() {
    const cancelled = this.reservasService.cancelReservation(this.reservationId, this.email);
    if (cancelled) {
      this.message = 'Reserva cancelada con éxito.';
      this.success = true;
    } else {
      this.message = 'No se encontró la reserva o no corresponde al usuario.';
      this.success = false;
    }
  }
 cancelarReservacion(codigo_reserva: string) {
   this.dataService.cancelReservation(codigo_reserva);
 }

}

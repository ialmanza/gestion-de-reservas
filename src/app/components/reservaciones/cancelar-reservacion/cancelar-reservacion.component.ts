import { Component } from '@angular/core';
import { ReservasService } from '../../../services/reservas.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cancelar-reservacion',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, FormsModule ],
  templateUrl: './cancelar-reservacion.component.html',
  styleUrl: './cancelar-reservacion.component.css'
})
export class CancelarReservacionComponent {
  reservationId: string = '';
  email: string = '';
  message: string = '';
  success: boolean = false;

  constructor(private reservasService: ReservasService) {}

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


}

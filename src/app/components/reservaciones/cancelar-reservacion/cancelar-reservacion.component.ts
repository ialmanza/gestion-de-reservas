import { Reserva } from './../../../models/Ireserva';
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

  constructor ( private dataService: DataService) {}



//Hay que subscribirse al observable de cancelarReservacion y manejar las respuestas de la API
cancelarReservacion(codigo_reserva: HTMLInputElement) {
  const valor_codigo = codigo_reserva.value;
  console.log('Reserva', valor_codigo, typeof valor_codigo);
  this.dataService.deleteItem(valor_codigo).subscribe({
    next: (response) => {
      this.message = 'Reserva cancelada con éxito.';
      this.success = true;
      console.log('Reserva cancelada con éxito.', response);
    },
    error: (error) => {
      this.message = 'No se pudo cancelar la reserva. Verifica el código y vuelve a intentarlo.';
      this.success = false;
      console.error('Error al cancelar la reserva:', error);
    }
  });
}


}

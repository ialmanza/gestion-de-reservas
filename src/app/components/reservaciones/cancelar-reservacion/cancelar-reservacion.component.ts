
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataReservacionesService } from '../../../services/supabase_data/data-reservaciones.service';

@Component({
  selector: 'app-cancelar-reservacion',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, FormsModule ],
  providers: [DataReservacionesService],
  templateUrl: './cancelar-reservacion.component.html',
  styleUrl: './cancelar-reservacion.component.css'
})
export class CancelarReservacionComponent {
  reservationId: string = '';
  email: string = '';
  message: string = '';
  success: boolean = false;

  constructor ( private dataService: DataReservacionesService) {}


cancelarReservacion(codigo_reserva: HTMLInputElement) {
  const valor_codigo = codigo_reserva.value;
  console.log('Reserva', valor_codigo, typeof valor_codigo);
  this.dataService.deleteReservaDB(valor_codigo).then((response) => {
    this.message = 'Reserva cancelada con éxito.';
    this.success = true;
    console.log('Reserva cancelada con éxito.', response);
  }).catch((error) => {
    this.message = 'No se pudo cancelar la reserva. Verifica el código y vuelve a intentarlo.';
    this.success = false;
    console.error('Error al cancelar la reserva:', error);
  });
}


}

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ReservaDB, DataReservacionesService } from '../../../services/supabase_data/data-reservaciones.service';

@Component({
  selector: 'app-reserva-nueva',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './reserva-nueva.component.html',
  styleUrls: ['./reserva-nueva.component.css'],
})
export class ReservaNuevaComponent implements OnInit {
  @Input() reservas!: ReservaDB;
  editForm: FormGroup;
  isModalOpen = false;
  isDeleteModalOpen = false;
  message: string = '';
  success: boolean = false;

  constructor(private fb: FormBuilder, private dataService: DataReservacionesService) {
    this.editForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      tipo_comida: ['', Validators.required],
      horario: ['', Validators.required],
      observaciones: [''],
      reservation_date: ['', Validators.required],
      chairs_needed: [1, Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.reservas) {
      this.editForm.patchValue(this.reservas);
    }
  }

  onEditReserva(): void {
    this.editForm.patchValue(this.reservas);
    this.isModalOpen = true;
  }

  onSubmitEdit(): void {
    if (this.editForm.valid) {
      const updatedReserva = this.editForm.value;

      const reservationId = this.reservas.codigo_reserva!;

      this.dataService.editReservaDB(updatedReserva,reservationId);

      this.isModalOpen = false;
    }
  }


  closeModal(): void {
    this.isModalOpen = false;
  }

  openDeleteModal(): void {
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
  }

  onConfirmDelete(): void {
    if (this.reservas?.codigo_reserva) {
      this.dataService.deleteReservaDB( this.reservas.codigo_reserva).then((response) => {
        this.message = 'Reserva cancelada con éxito.';
        this.success = true;
        console.log('Reserva eliminada con éxito.', response);
      }).catch((error) => {
        this.message = 'No se pudo cancelar la reserva. Verifica el código y vuelve a intentarlo.';
        this.success = false;
        console.error('Error al eliminar la reserva:', error);
      });
      this.closeDeleteModal();
    }
  }
}

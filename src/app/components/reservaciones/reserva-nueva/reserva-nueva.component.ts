import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Reserva } from '../../../models/Ireserva';
import { DataService } from '../../../services/data-service.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reserva-nueva',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule ],
  providers: [DataService],
  templateUrl: './reserva-nueva.component.html',
  styleUrls: ['./reserva-nueva.component.css'],
})
export class ReservaNuevaComponent implements OnInit {
  @Input() reservas!: Reserva;
  editForm: FormGroup;
  isModalOpen = false;
  isDeleteModalOpen = false;

  constructor(private fb: FormBuilder, private dataService: DataService) {
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

      const payload = {
        first_name: updatedReserva.nombre,
        last_name: updatedReserva.apellidos,
        email: updatedReserva.email,
        phone_number: updatedReserva.telefono,
        tipo_comida: updatedReserva.tipo_comida,
        reservation_time: updatedReserva.horario,
        special_requests: updatedReserva.observaciones,
        reservation_date: updatedReserva.reservation_date,
        chairs_needed: updatedReserva.chairs_needed,
      };

      const reservationId = this.reservas.codigo_reserva!;

      this.dataService.updateReserva(payload, reservationId).subscribe({
        next: (response) => {
          console.log('Reserva actualizada:', response);
          this.isModalOpen = false;
        },
        error: (error) => {
          console.error('Error al actualizar la reserva:', error);
        },
      });
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
      this.dataService.deleteItem(this.reservas.codigo_reserva).subscribe({
        next: () => {
          console.log('Reserva eliminada con éxito');
          this.isDeleteModalOpen = false;
        },
        error: (error) => {
          console.error('Error al eliminar la reserva:', error);
        },
      });
    }
  }
}

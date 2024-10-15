import { Component, Input } from '@angular/core';
import { ReservasService } from '../../../services/reservas.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Reserva } from '../../../models/Ireserva';
import { MatDialog} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DataService } from '../../../services/data-service.service';


@Component({
  selector: 'app-reserva-nueva',
  standalone: true,
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, MatButtonModule],
  providers: [ReservasService, DataService],
  templateUrl: './reserva-nueva.component.html',
  styleUrl: './reserva-nueva.component.css'
})
export class ReservaNuevaComponent {
  @Input() reservas: Reserva | undefined;
  editing: boolean = false;
  private editModal: any;
  isModalOpen = false;
  editForm: FormGroup;


  constructor( private reservasService: ReservasService, private dialog: MatDialog, private fb: FormBuilder, private dataService: DataService) {
    this.editForm = this.fb.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      tipo_comida: ['', Validators.required],
      horario: ['', Validators.required],
      observaciones: ['']
    });
   }


  ngOnInit(): void {
    if (this.reservas) {
      this.editForm.patchValue(this.reservas);
    }
   }

  openEditDialog(reserva: any) {
    this.isModalOpen = true;
    this.editForm.patchValue(reserva);
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onSubmitEdit() {
    if (this.editForm.valid) {
      const updatedReserva = this.editForm.value;
      this.reservasService.updateReserva(updatedReserva);
      this.closeModal();
    }
  }

  deleteReserva(reservas : Reserva) {
    if(confirm('Está seguro que desea borrar esta reserva?')) {
      console.log(typeof reservas.id, reservas.id);
      //this.reservasService.deleteReserva(reservas.id);
      this.dataService.deleteItem(parseInt(reservas.id));
    }
  }

  toggleEdit() {
    this.editing = !this.editing;
  }


  openEditModal() {
    this.editing = true;
    this.editModal.show();
  }


}

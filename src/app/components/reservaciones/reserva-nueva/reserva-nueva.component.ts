import { Component, OnInit, Input } from '@angular/core';
import { ReservasService } from '../../../services/reservas.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Reserva } from '../../../models/Ireserva';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogContentEditExampleDialog } from '../editar-reservacion/editar-reservacion.component';

//declare var bootstrap: any; // Declara bootstrap para usar JS del modal

@Component({
  selector: 'app-reserva-nueva',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './reserva-nueva.component.html',
  styleUrl: './reserva-nueva.component.css'
})
export class ReservaNuevaComponent {
  @Input() reservas: Reserva | undefined;
  editing: boolean = false;
  private editModal: any;


  constructor( private reservasService: ReservasService, private dialog: MatDialog) {
   }


  ngOnInit(): void {
    //this.editModal = new bootstrap.Modal(document.getElementById('editModal'));
    //this.getReservas();
  }

  deleteReserva(reservas : Reserva) {
    if(confirm('Está seguro que desea borrar esta reserva?')) {
      this.reservasService.deleteReserva(reservas.id);
    }
  }

  toggleEdit() {
    this.editing = !this.editing;
  }

  // saveChanges() {
  //   if (this.reservas) {
  //     this.reservasService.updateReserva(this.reservas);
  //   }
  //    this.toggleEdit(); // Desactiva la edición después de guardar
    //this.closeModal();

  //}

  openEditModal() {
    this.editing = true;
    this.editModal.show();
  }

  closeModal() {
    this.editing = false;
    this.editModal.hide();
  }

  openEditDialog(reserva: Reserva) {
    const dialogRef = this.dialog.open(DialogContentEditExampleDialog, {
      data: reserva
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log(typeof(result));
        this.reservasService.updateReserva(result);
      }
    });
  }


}

import { Component, Input,Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-editar-reservacion',
  standalone: true,
  imports: [ MatDialogModule, MatButtonModule, CommonModule, FormsModule, MatFormField, MatInputModule ],
  templateUrl: './editar-reservacion.component.html',
  styleUrl: './editar-reservacion.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EditarReservacionComponent {

  constructor(public dialog: MatDialog) {}
  openEditDialog(reservacion: any) {
    const dialogRef = this.dialog.open(DialogContentEditExampleDialog, {
      data: reservacion
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  }

  @Component({
    selector: 'dialog-content-example-dialog',
    standalone: true,
    imports: [MatDialogModule, MatButtonModule, CommonModule, FormsModule, MatFormField, MatInputModule],
    templateUrl: 'editar-reservacion.html',
    styleUrl: './editar-reservacion.component.css',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  })
  export class DialogContentEditExampleDialog implements OnInit {
    @Input() reservaciones: any = {};
    editing: any;

    form: FormGroup = new FormGroup({
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      email: new FormControl(''),
      specials_requests: new FormControl(''),
    });

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<EditarReservacionComponent>) {
      this.reservaciones = JSON.stringify(data);
    }

    ngOnInit(): void {
      this.form = new FormGroup({
        first_name: new FormControl(this.data.nombre),
        last_name: new FormControl(this.data.apellidos),
        email: new FormControl(this.data.email),
        specials_requests: new FormControl(this.data.observaciones),
      })
    }

    onNoClick(): void {
      this.dialogRef.close(false);
    }


    onYesClick(): void {
      this.dialogRef.close(this.form.value);
      console.log(this.form.value);
    }
  }

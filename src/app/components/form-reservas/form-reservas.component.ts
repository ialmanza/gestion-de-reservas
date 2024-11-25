import {Component, inject} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation, MatStepperModule} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AsyncPipe} from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ReservasService } from '../../services/reservas.service';
import { Router } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import {ChangeDetectionStrategy, model} from '@angular/core';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DataService } from '../../services/data-service.service';
import { Reserva } from '../../models/Ireserva';
import { ReservaDetailsComponent } from "../reservaciones/reserva-details/reserva-details.component";
import { MatSelectModule } from '@angular/material/select';
import { MissingFieldsModalComponent } from '../missing-fields-modal/missing-fields-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-form-reservas',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatStepperModule, FormsModule,
    ReactiveFormsModule, AsyncPipe, MatCardModule, MatTabsModule, CommonModule, MatDatepickerModule, ReservaDetailsComponent,
    MatSelectModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ReservasService, provideNativeDateAdapter(), DataService],
  templateUrl: './form-reservas.component.html',
  styleUrl: './form-reservas.component.css'
})
export class FormReservasComponent {
  personas = [1, 2, 3, 4];
  cantidadSeleccionada: number | null = 1;
  reservation_date: string | null = null;
  tipo_comida: string | null = null;
  reservation_time: string | null = null;
  horariosAlmuerzo = ['11:00', '12:00', '13:00'];
  horariosCena = ['19:00', '20:00', '21:00'];
  selected = model<Date | null>(null);
  pasoActual: number = 1;
  id_email: string = '';
  now = new Date();
  reservas : Reserva[];
  ultimaReservaConfirmada: Reserva | null = null;
  paymentForm: FormGroup;
  mensajeRespuesta: string = '';
  datosReserva: any = null;


  private _formBuilder = inject(FormBuilder);

  nameFormGroup = this._formBuilder.group({
    first_name: ['', Validators.required],
  });
  apellidosFormGroup = this._formBuilder.group({
    last_name: ['', Validators.required],
  })
  comentarioFormGroup = this._formBuilder.group({
    special_requests: [''],
  })
  emailFormGroup = this._formBuilder.group({
    email: ['', Validators.required],
  });
  telefonoFormGroup = this._formBuilder.group({
    phone_number: ['', Validators.required],
  });

  stepperOrientation: Observable<StepperOrientation>;

  constructor( private router: Router, private dataService: DataService, public dialog: MatDialog)
   {

    this.paymentForm = this._formBuilder.group({

      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
      cardHolderName: ['', Validators.required],
      bankName: ['', Validators.required]
    });
    const breakpointObserver = inject(BreakpointObserver);
    this.reservas = [];
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }


  adicionarReserva() {
    this.id_email = "";
    const id = Date.now().toString();
    this.id_email = id;
    const missingFields = [];

    const first_name = this.nameFormGroup.get('first_name')?.value as string;
    const last_name = this.apellidosFormGroup.get('last_name')?.value as string;
    const email = this.emailFormGroup.get('email')?.value as string;
    const phone_number = this.telefonoFormGroup.get('phone_number')?.value as string;
    const special_requests = this.comentarioFormGroup.get('special_requests')?.value as string;

     // Validar si la fecha es posterior a la fecha actual
    const selectedDate = new Date(this.reservation_date!); // Conversión de fecha y hora a los formatos requeridos
    const today = new Date();
    if (selectedDate < today) {
      missingFields.push('Fecha (debe ser posterior a hoy)');
    }
    const formattedDate = selectedDate.toISOString().split('T')[0];

    // Ajustar reservation_time a formato hh:mm:ss.uuuuuu
    let formattedTime = this.reservation_time;
    if (this.reservation_time!.length === 5) { // formato hh:mm
        formattedTime = `${this.reservation_time}:00.000000`;
    } else if (this.reservation_time!.length === 8) { // formato hh:mm:ss
        formattedTime = `${this.reservation_time}.000000`;
    }

       // Check for missing required fields before making the API call

    if (!first_name) {
      missingFields.push('Nombre');
    }
    if (!last_name) {
      missingFields.push('Apellidos');
    }
    if (!email || !this.validateEmail(email)) {
      missingFields.push('Correo Electrónico (formato válido)');
    }
    // Add checks for other required fields


    if (missingFields.length > 0) {
      // Show modal indicating missing fields
      this.openModal('Campos Faltantes', `Los siguientes campos obligatorios no se han completado: ${missingFields.join(', ')}`);
      return; // Prevent the API call if any fields are missing
    }
    // Llamada al servicio para crear la reserva
    this.dataService.createItem({
      id,
      first_name,
      last_name,
      email,
      special_requests,
      tipo_comida: this.tipo_comida!,
      reservation_time: formattedTime,
      reservation_date: formattedDate,
      chairs_needed: this.cantidadSeleccionada!,
      phone_number,
      hide: true
    }).subscribe({
      next: (response) => {
        this.mensajeRespuesta = 'Reserva realizada con éxito';
        this.datosReserva = response; // Almacena los datos de la reserva
        console.log('Reserva creada:', response);
      },
      error: (error) => {
        this.mensajeRespuesta = error.message; // Muestra el mensaje de error
      }
    });

    this.avanzarPaso();
}
  openModal(title: string, message: string) {
    const dialogRef = this.dialog.open(MissingFieldsModalComponent, {
      data: { title, message }
    });
  }

  validateEmail(email: string): boolean {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());  

  }
  seleccionarPersonas(numero: number) {
    this.cantidadSeleccionada = numero;

    console.log('Cantidad seleccionada:', numero);
  }

  seleccionarTipoComida(tipo: string) {
    this.tipo_comida = tipo;
    this.reservation_time = null;
  }

  seleccionarHorario(horario: string) {
    this.reservation_time = horario;
    console.log('Horario seleccionado:', horario);
  }

  calcularTotal(): number {
    return (this.cantidadSeleccionada || 0) * 3000;
  }

  procesarPago() {
    if (this.paymentForm.valid) {
      const paymentData = this.paymentForm.value;
      console.log('Datos del Pago:', paymentData);
      console.log('Total a pagar:', this.calcularTotal());

      // Aquí podrías simular un proceso de pago o enviar los datos a un servicio
      this.avanzarPaso();
    } else {
      console.log('Formulario de pago no es válido.');
    }
  }

  avanzarPaso() {
    if (this.pasoActual < 8) {
      this.pasoActual++;
    }
  }

  retrocederPaso() {
    if (this.pasoActual > 1) {
      this.pasoActual--;
    }
    if (this.pasoActual === 7) {
      this.cerrarYMostrarDetalles( this.datosReserva );
    }
  }

  reiniciarFormulario(){
    this.nameFormGroup.reset();
    this.apellidosFormGroup.reset();
    this.emailFormGroup.reset();
    this.comentarioFormGroup.reset();
    this.cantidadSeleccionada = null;
    this.reservation_time = null;
    this.reservation_date = null;
    this.tipo_comida = null;
    this.telefonoFormGroup.reset();
    this.pasoActual = 1;
  }

  incrementarPersonas() {
    if (this.cantidadSeleccionada === null) {
      this.cantidadSeleccionada = 1;
    } else if (this.cantidadSeleccionada < 1000) {
      this.cantidadSeleccionada++;
    }
  }

  decrementarPersonas() {
    if (this.cantidadSeleccionada === null || this.cantidadSeleccionada > 1) {
      this.cantidadSeleccionada = this.cantidadSeleccionada ? this.cantidadSeleccionada - 1 : 1;
    }
  }

  actualizarCantidad(): void {
    if (this.cantidadSeleccionada! < 1) {
      this.cantidadSeleccionada = 1; // Evitar que sea menor a 1
    }
  }


  cerrarYMostrarDetalles(reservaData: any) {
    this.reiniciarFormulario();
    this.dataService.createItem(reservaData).subscribe({
      next: (response) => {
        this.mensajeRespuesta = 'Reserva realizada con éxito';
        this.datosReserva = response; // Almacena los datos de la reserva
      },
      error: (error) => {
        this.mensajeRespuesta = error.message; // Muestra el mensaje de error
      }
    });

  }

}

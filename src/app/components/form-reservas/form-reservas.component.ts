import {Component, inject} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormControl} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation, MatStepperModule} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AsyncPipe} from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import {ChangeDetectionStrategy, model} from '@angular/core';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { Reserva } from '../../models/Ireserva';
import { ReservaDetailsComponent } from "../reservaciones/reserva-details/reserva-details.component";
import { MatSelectModule } from '@angular/material/select';
import { MissingFieldsModalComponent } from '../missing-fields-modal/missing-fields-modal.component';
import { MatDialog } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import { DataReservacionesService, ReservaDB } from '../../services/supabase_data/data-reservaciones.service';

@Component({
  selector: 'app-form-reservas',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatStepperModule, FormsModule,
    ReactiveFormsModule, AsyncPipe, MatCardModule, MatTabsModule, CommonModule, MatDatepickerModule, ReservaDetailsComponent,
    MatSelectModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ provideNativeDateAdapter(), DataReservacionesService],
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

  constructor( private router: Router, public dialog: MatDialog, private dataReservacionesService: DataReservacionesService)
   {

    this.paymentForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
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


    const selectedDate = new Date(this.reservation_date!);
    const today = new Date();
    if (selectedDate < today) {
      missingFields.push('Fecha (debe ser posterior a hoy)');
    }
    const formattedDate = selectedDate.toISOString().split('T')[0];

    if (this.cantidadSeleccionada! > 1000) {
      missingFields.push('Cantidad de personas (debe ser menor o igual a 1000)');
    }


    let formattedTime = this.reservation_time;
    if (this.reservation_time!.length === 5) {
        formattedTime = `${this.reservation_time}:00.000000`;
    } else if (this.reservation_time!.length === 8) {
        formattedTime = `${this.reservation_time}.000000`;
    }


    if (!first_name) {
      missingFields.push('Nombre');
    }
    if (!last_name) {
      missingFields.push('Apellidos');
    }
    if (!email || !this.validateEmail(email)) {
      missingFields.push('Correo Electrónico (formato válido)');
    }
    if (!phone_number) {
      missingFields.push('Número de Teléfono');
    }
    if (!this.cantidadSeleccionada) {
      missingFields.push('Cantidad de personas');
    }
    if (!this.reservation_time) {
      missingFields.push('Horario');
    }
    if (!this.reservation_date) {
      missingFields.push('Fecha');
    }
    if (!this.tipo_comida) {
      missingFields.push('Tipo de comida');
    }


    if (missingFields.length > 0) {

      this.openModal('Campos Faltantes', `Los siguientes campos obligatorios no se han completado: ${missingFields.join(', ')}`);
      return;
    }

    this.dataReservacionesService.createItem({
      id,
      nombre: first_name,
      apellido: last_name,
      email: email,
      observaciones: special_requests,
      tipo_comida: this.tipo_comida!,
      hora: formattedTime!,
      fecha: formattedDate,
      persona: this.cantidadSeleccionada!,
      telefono: phone_number,
      codigo_reserva : this.generateUniqueHexCode()
    })

    this.router.navigate(['/']);

    //this.avanzarPaso();
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

      // Está simulado, no se envia a la base de datos
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
    this.downloadReservation();
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
      this.cantidadSeleccionada = 1;
    }
  }

  cerrarYMostrarDetalles(reservaData: any) {
    this.reiniciarFormulario();
    this.dataReservacionesService.createItem(reservaData).then((response) => {

        this.mensajeRespuesta = 'Reserva realizada con éxito';
        this.datosReserva = response;

    }).catch((error) => {
        this.mensajeRespuesta = error.message;
      });


  }

  downloadReservation() {
    if (!this.datosReserva) {
      console.error('No hay datos de reservación disponibles para descargar.');
      return;
    }

    const doc = new jsPDF();

    // Configuración inicial del documento
    doc.setFontSize(16);
    doc.text('Confirmación de Reserva', 105, 10, { align: 'center' });

    // Espaciado y detalles de la reservación
    doc.setFontSize(12);
    doc.text(`Código de Reserva: ${this.datosReserva.codigo_reserva}`, 10, 40);
    doc.text(`Nombre: ${this.datosReserva.first_name} ${this.datosReserva.last_name}`, 10, 50);
    doc.text(`Fecha de la Reserva: ${this.datosReserva.reservation_date}`, 10, 60);
    doc.text(`Hora de la Reserva: ${this.datosReserva.reservation_time}`, 10, 70);

    if (this.datosReserva.special_requests) {
      doc.text(`Comentarios: ${this.datosReserva.special_requests}`, 10, 80);
    }


    doc.text('¡Gracias por su reserva! Nos vemos pronto.', 10, 120);

    // Genera y descarga el archivo PDF
    doc.save(`reserva_${this.datosReserva.first_name}_${this.datosReserva.last_name}.pdf`);
  }

  generateUniqueHexCode(): string {
    const randomNum = Math.floor(Math.random() * 16**6);
    const hexCode = randomNum.toString(16).padStart(6, '0');

    return `#${hexCode}`;
  }

}

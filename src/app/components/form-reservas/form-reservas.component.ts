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
import { format } from 'date-fns';
import { Reserva } from '../../models/Ireserva';
import { ReservaDetailsComponent } from "../reservaciones/reserva-details/reserva-details.component";
import { MatSelectModule } from '@angular/material/select';

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
  personas = [1, 2, 3, 4, 5];
  cantidadSeleccionada: number | null = 1;
  reservation_date: string | null = null;
  tipo_comida: string | null = null;
  reservation_time: string | null = null;
  horariosAlmuerzo = ['11:00 AM', '12:00 PM', '1:00 PM'];
  horariosCena = ['7:00 PM', '8:00 PM', '9:00 PM'];
  selected = model<Date | null>(null);
  pasoActual: number = 1;
  id_email: string = '';
  now = new Date();
  reservas : Reserva[];
  ultimaReservaConfirmada: Reserva | null = null;
  paymentForm: FormGroup;


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

  constructor( private reservasService: ReservasService, private router: Router, private dataService: DataService)
   {
    this.paymentForm = this._formBuilder.group({
      //cardType: ['', Validators.required],
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

    // Obtener valores de los FormGroups
    const first_name = this.nameFormGroup.get('first_name')?.value as string;
    const last_name = this.apellidosFormGroup.get('last_name')?.value as string;
    const email = this.emailFormGroup.get('email')?.value as string;
    const phone_number = this.telefonoFormGroup.get('phone_number')?.value as string;
    const special_requests = this.comentarioFormGroup.get('special_requests')?.value as string;

    //this.reservasService.addReserva({
    this.dataService.createItem({
      id,
      first_name,
      last_name,
      email,
      special_requests,
      tipo_comida: this.tipo_comida!,
      reservation_time: this.reservation_time = format(this.now, 'HH:mm:ss.SSS'),
      reservation_date: this.reservation_date = format(this.now, 'yyyy-MM-dd'),
      chairs_needed: this.cantidadSeleccionada!,
      phone_number,
      hide: true

    }).subscribe(
      response => {
        console.log('Reserva añadida exitosamente:', response);

        // Guarda el ID de la reserva generada
        localStorage.setItem('ultimaReservaId', response.id);

        // Muestra un mensaje de éxito
        alert('Reserva agregada correctamente. Ver detalles.');

        // Cierra el formulario
        this.reiniciarFormulario();
      },
      error => {
        console.error('Error al añadir la reserva:', error);
        // Mostrar mensaje de error al usuario
      }
    );

    this.avanzarPaso();
  }


  cerrar() {
    if (this.nameFormGroup.valid && this.apellidosFormGroup.valid && this.emailFormGroup.valid
      && this.cantidadSeleccionada !== null && this.reservation_time !== null) {

      this.adicionarReserva();


    }
    this.router.navigate(['/layout']);
  }

  seleccionarPersonas(numero: number) {
    this.cantidadSeleccionada = numero;
    // Agregar lógica adicional para guardar la cantidad seleccionada
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
      this.cerrarYMostrarDetalles();
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


// getReservConfirm() {
//   this.dataService.getItems().subscribe((reservas: Reserva[]) => {
//     this.reservas = reservas;

//     const ultimaReserva = this.reservas[this.reservas.length - 1];

//     if (ultimaReserva) {
//       this.ultimaReservaConfirmada = ultimaReserva;

//       this.reservation_time = ultimaReserva.horario;
//     }
//   });
// }

cerrarYMostrarDetalles() {
  this.reiniciarFormulario();
  const ultimaReservaId = localStorage.getItem('ultimaReservaId');

  if (ultimaReservaId) {
    this.router.navigate(['/reserva-details/', ultimaReservaId]);
  } else {
    console.error('No se encontró un ID de reserva en el localStorage');
    // Puedes mostrar un mensaje al usuario o manejar el caso de otra forma.
  }
}

}

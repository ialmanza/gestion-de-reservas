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
import emailjs from '@emailjs/browser';
import { Resend } from 'resend';

@Component({
  selector: 'app-form-reservas',
  standalone: true,
  imports: [ MatButtonModule, MatFormFieldModule, MatInputModule, MatStepperModule, FormsModule,
             ReactiveFormsModule, AsyncPipe, MatCardModule, MatTabsModule, CommonModule, MatDatepickerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ReservasService, provideNativeDateAdapter()],
  templateUrl: './form-reservas.component.html',
  styleUrl: './form-reservas.component.css'
})
export class FormReservasComponent {
  personas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  cantidadSeleccionada: number | null = null;
  fechaSeleccionada: any;
  tipoComidaSeleccionada: string | null = null;
  horarioSeleccionado: string | null = null;
  horariosAlmuerzo = ['11:00 AM', '12:00 PM', '1:00 PM'];
  horariosCena = ['7:00 PM', '8:00 PM', '9:00 PM'];
  selected = model<Date | null>(null);
  pasoActual: number = 1;
  id_email: string = '';

  private _formBuilder = inject(FormBuilder);

  nameFormGroup = this._formBuilder.group({
    nameCtrl: ['', Validators.required],
  });
  apellidosFormGroup = this._formBuilder.group({
    apellidosCtrl: ['', Validators.required],
  })
  comentarioFormGroup = this._formBuilder.group({
    comentarioCtrl: [''],
  })
  emailFormGroup = this._formBuilder.group({
    emailCtrl: ['', Validators.required],
  });
  telefonoFormGroup = this._formBuilder.group({
    telefonoCtrl: ['', Validators.required],
  });

  stepperOrientation: Observable<StepperOrientation>;

  constructor( private reservasService: ReservasService, private router: Router)
   {
    const breakpointObserver = inject(BreakpointObserver);

    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  adicionarReserva() {
    this.id_email = "";
    const id = Date.now().toString();
    this.id_email = id;

    // Obtener valores de los FormGroups
    const nombre = this.nameFormGroup.get('nameCtrl')?.value as string;
    const apellidos = this.apellidosFormGroup.get('apellidosCtrl')?.value as string;
    const email = this.emailFormGroup.get('emailCtrl')?.value as string;
    const telefono= this.telefonoFormGroup.get('telefonoCtrl')?.value as string;
    const observaciones = this.comentarioFormGroup.get('comentarioCtrl')?.value as string;



    this.reservasService.addReserva({
      id,
      nombre,
      apellidos,
      email,
      observaciones,
      tipo_comida: this.tipoComidaSeleccionada!,
      horario: this.horarioSeleccionado!,
      telefono,
      hide: true
    });


    //this.sendByResend();
    this.reiniciarFormulario();
  }

  cerrar() {
    if (this.nameFormGroup.valid && this.apellidosFormGroup.valid && this.emailFormGroup.valid
      && this.cantidadSeleccionada !== null && this.horarioSeleccionado !== null) {

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
    this.tipoComidaSeleccionada = tipo;
    this.horarioSeleccionado = null;
  }

  seleccionarHorario(horario: string) {
    this.horarioSeleccionado = horario;
    console.log('Horario seleccionado:', horario);
  }

  avanzarPaso() {
    if (this.pasoActual < 5) {
      this.pasoActual++;
    }
  }

  retrocederPaso() {
    if (this.pasoActual > 1) {
      this.pasoActual--;
    }
  }

  reiniciarFormulario(){
    this.nameFormGroup.reset();
    this.apellidosFormGroup.reset();
    this.emailFormGroup.reset();
    this.comentarioFormGroup.reset();
    this.cantidadSeleccionada = null;
    this.horarioSeleccionado = null;
    this.fechaSeleccionada = null;
    this.tipoComidaSeleccionada = null;
    this.telefonoFormGroup.reset();
    this.pasoActual = 1;
  }


  //EN DESARROLLO
//     async send(){
//       emailjs.init('okEjA9dn2w_9EpoeX');
//       let response = await emailjs.send("service_bu227zg","template_7u644ss",{
//         from_name: "Reservaciones",
//         to_name: this.nameFormGroup.value.nameCtrl ,
//         reply_to: this.emailFormGroup.value.emailCtrl,
//         message: "Gracias por tu reserva, su identificación es" + this.id_email,
//         });
//         console.log(response);
//         console.log("El correo se envió correctamente");
//         alert("El correo se envió correctamente");
//   }

//     sendByResend() {
//       const resend = new Resend('re_Pe6qVeXq_Cau3WSeqGk4DhsbMBxuUiUkt');

//       resend.emails.send({
//         from: 'reservaciones.desarrolloweb@gmail.com',
//         to: this.emailFormGroup.value.emailCtrl!,
//         subject: 'Reservación confirmada',
//         html: '<p>Su código de reserva es <strong>' + this.id_email + '</strong>!</p>'
//       });
//       console.log("El correo se envió correctamente");
//     }

 }

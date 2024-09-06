import { Component, OnInit } from '@angular/core';
import { ReservasService } from '../../../services/reservas.service';
import { ReservasListComponent } from '../reservas-list/reservas-list.component';

@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [ ReservasListComponent ],
  providers: [ReservasService],
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.css'
})
export class ReservaComponent {

  constructor( private reservasService: ReservasService) { }

  ngOnInit() {}

  adicionarReserva(name: HTMLInputElement, apellido: HTMLInputElement, email: HTMLInputElement, tipo:HTMLInputElement, horario:HTMLInputElement, telefono:HTMLInputElement, observaciones: HTMLTextAreaElement) {
    const id = Date.now().toString();
    this.reservasService.addReserva({id, nombre: name.value, apellidos: apellido.value, email: email.value, observaciones: observaciones.value, tipo_comida: tipo.value, horario: horario.value, telefono: telefono.value, hide: true});
    name.value = '';
    apellido.value = '';
    email.value = '';
    telefono.value = '';
    tipo.value = '';
    horario.value = '';
    observaciones.value = '';
    name.focus();
    return false;
  }
}

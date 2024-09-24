import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'flowbite';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  totalReservas: number = 10; // Simulación de datos
  reservasDelDia = [{ nombre: 'Juan', hora: '19:00' }, { nombre: 'Ana', hora: '20:00' }];
  totalClientes: number = 100; // Simulación de datos
  clientesFrecuentes: number = 25; // Simulación de datos
  notificaciones = ['Cambio de horario el próximo sábado.', 'Nuevo menú disponible.'];
}

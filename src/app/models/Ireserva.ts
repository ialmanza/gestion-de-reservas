export interface Reserva {
  id: string;
  nombre: string;
  apellidos: string;
  email: string;
  observaciones: string;
  tipo_comida: string;
  horario: string;
  telefono: string;
  hide: boolean;
  codigo_reserva?: string
}

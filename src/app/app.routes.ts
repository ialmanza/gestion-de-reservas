import { Routes } from '@angular/router';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import { AuthSignUpComponent } from './components/auth-sign-up/auth-sign-up.component';
import { privateGuard } from './shared/guards/auth.guards';
import { LayoutComponent } from './components/layout/layout.component';
import { FormReservasComponent } from './components/form-reservas/form-reservas.component';
import { RolesTableComponent } from './components/roles-table/roles-table.component';
import { RoleChangePassComponent } from './components/roles-change-pass/role-change-pass.component';
import { CancelarReservacionComponent } from './components/reservaciones/cancelar-reservacion/cancelar-reservacion.component';
import { RoleGuard } from './guards/role.guard';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { ReservasListComponent } from './components/reservaciones/reservas-list/reservas-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReservaDetailsComponent } from './components/reservaciones/reserva-details/reserva-details.component';
import { PoliticPrivacidadComponent } from './components/politic-privacidad/politic-privacidad.component';
import { HomeComponent } from './components/home/home.component';
import { MissingFieldsModalComponent } from './components/missing-fields-modal/missing-fields-modal.component';
import { GraficoComponent } from './components/grafico/grafico.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'admin',
    component: AuthLoginComponent,
  },
  {
    path: 'auth-sign-up',
    component: AuthSignUpComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'form-reservas',
    component: FormReservasComponent,
  },

   {
    path: 'layout',
    component: LayoutComponent,
    canActivate: [privateGuard],
    children: [

      {
        path: 'dashboard',
        loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent),

      },
      {
        path: 'reservas-list',
        loadComponent: () => import('./components/reservaciones/reservas-list/reservas-list.component').then(m => m.ReservasListComponent),

      },
      {
        path:'reservas-form',
        loadComponent: () => import('./components/form-reservas/form-reservas.component').then(m => m.FormReservasComponent),
      },
       {
        path: 'roles-table',
        loadComponent: () => import('./components/roles-table/roles-table.component').then(m => m.RolesTableComponent),
        canActivate: [RoleGuard],
      },
       {
        path: 'roles-change-pass',
        loadComponent: () => import('./components/roles-change-pass/role-change-pass.component').then(m => m.RoleChangePassComponent),

      },
       {
        path: 'cancelar-reservacion',
        loadComponent: () => import('./components/reservaciones/cancelar-reservacion/cancelar-reservacion.component').then(m => m.CancelarReservacionComponent),
       },

    ]
   },


];


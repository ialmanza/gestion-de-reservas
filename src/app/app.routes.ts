import { Routes } from '@angular/router';
import { ReservaComponent } from './components/reservaciones/reservas-form/reserva.component';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import { AuthSignUpComponent } from './components/auth-sign-up/auth-sign-up.component';
import { privateGuard } from './shared/guards/auth.guards';
import { LayoutComponent } from './components/layout/layout.component';
import { FormReservasComponent } from './components/form-reservas/form-reservas.component';


export const routes: Routes = [
  {
    path: '',
    component: FormReservasComponent,
  },
  {
    path: 'admin',
    component: AuthLoginComponent,
  },
  {
    path: 'auth-login',
    component: AuthLoginComponent
  },
  {
    path: 'auth-sign-up',
    component: AuthSignUpComponent
  },
  {
    path: 'form-reservas',
    component: FormReservasComponent,
  },
  // {
  //   path: 'listar-reservas',
  //   loadComponent: () => ReservasListComponent,

  // },

  // {
  //   path: 'sidebar',
  //   loadComponent: () => SidebarComponent,
  // },
  {
    path: 'reserva',
    loadComponent: () => ReservaComponent,
  },



   {
    path: 'layout',
    component: LayoutComponent,
    canActivate: [privateGuard],
    children: [
      {
        path: 'reserva',
        loadComponent: () => import('./components/reservaciones/reservas-form/reserva.component').then(m => m.ReservaComponent),

      },
      {
        path: 'dashboard',
        loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent),

      },
      {
        path: 'reservas-list',
        loadComponent: () => import('./components/reservaciones/reservas-list/reservas-list.component').then(m => m.ReservasListComponent),

      },
      {
        path:'register',
        loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent),

      },
      {
        path:'reservas-form',
        loadComponent: () => import('./components/form-reservas/form-reservas.component').then(m => m.FormReservasComponent),
      }
    ]
   },



];


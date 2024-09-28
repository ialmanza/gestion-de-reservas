import { Routes } from '@angular/router';
import { ReservaComponent } from './components/reservaciones/reservas-form/reserva.component';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import { AuthSignUpComponent } from './components/auth-sign-up/auth-sign-up.component';
import { privateGuard } from './shared/guards/auth.guards';
import { LayoutComponent } from './components/layout/layout.component';
import { FormReservasComponent } from './components/form-reservas/form-reservas.component';
import { RolesComponent } from './components/roles/roles.component';
import { RolesTableComponent } from './components/roles-table/roles-table.component';
import { RoleChangePassComponent } from './components/roles-change-pass/role-change-pass.component';
import { CancelarReservacionComponent } from './components/reservaciones/cancelar-reservacion/cancelar-reservacion.component';
import { RoleGuard } from './guards/role.guard';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AdministradorFormComponent } from './components/administradores/administrador-form/administrador-form.component';
import { ReservasListComponent } from './components/reservaciones/reservas-list/reservas-list.component';

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
    component: AuthSignUpComponent,
    canActivate: [RoleGuard],
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
      },
      {
        path: 'administrador-form',
        loadComponent: () => import('./components/administradores/administrador-form/administrador-form.component').then(m => m.AdministradorFormComponent),
        canActivate: [RoleGuard],
      },
       {
        path: 'roles',
        loadComponent: () => import('./components/roles/roles.component').then(m => m.RolesComponent),
        canActivate: [RoleGuard],
      },
       {
        path: 'roles-table',
        loadComponent: () => import('./components/roles-table/roles-table.component').then(m => m.RolesTableComponent),
        canActivate: [RoleGuard],
      },
       {
        path: 'roles-change-pass',
        loadComponent: () => import('./components/roles-change-pass/role-change-pass.component').then(m => m.RoleChangePassComponent),
        canActivate: [RoleGuard],
      },
       {
        path: 'cancelar-reservacion',
        loadComponent: () => import('./components/reservaciones/cancelar-reservacion/cancelar-reservacion.component').then(m => m.CancelarReservacionComponent),
       },
    ]
   },

   {
    path: 'roles',
    component: RolesComponent
   },

   {
    path: 'roles-table',
    component: RolesTableComponent
   },

   {
    path: 'roles-change-pass',
    component: RoleChangePassComponent
   },

   {
    path: 'cancelar-reservacion',
    component: CancelarReservacionComponent
   },
   {
    path: 'access-denied',
    component: AccessDeniedComponent // Crear un componente que muestre el mensaje de acceso denegado
  },
  {
    path: 'navigation',
    component: NavigationComponent
  },
  {
    path: 'administrador-form',
    component: AdministradorFormComponent
  },
  {
    path:"reservas-form",
    component: FormReservasComponent
  },
  {
    path: 'reservas-list',
    component: ReservasListComponent
  }



];


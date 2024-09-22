import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RolesService } from '../../services/roles.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-role-change-pass',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './role-change-pass.component.html',
  styleUrl: './role-change-pass.component.css'
})
export class RoleChangePassComponent {
  changePasswordForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private rolesService: RolesService) {
    this.changePasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.changePasswordForm.valid) {
      const { email, newPassword } = this.changePasswordForm.value;


      if (!this.rolesService.isEmailValid(email)) {
        this.errorMessage = 'El correo electrónico no existe en el sistema.';
        return;
      }


      const success = this.rolesService.updatePassword(email, newPassword);

      if (success) {
        this.errorMessage = null;
        alert('Contraseña actualizada exitosamente.');
      } else {
        this.errorMessage = 'Error al actualizar la contraseña.';
      }
    }
  }
}

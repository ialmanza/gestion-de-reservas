import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RolesBdService } from '../../services/roles-bd.service';
import { AuthService } from '../Auth/auth.service';

@Component({
  selector: 'app-role-change-pass',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [RolesBdService],
  templateUrl: './role-change-pass.component.html',
  styleUrl: './role-change-pass.component.css'
})
export class RoleChangePassComponent {
  changePasswordForm: FormGroup;
  errorMessage: string | null = null;
  private _authService = inject(AuthService);

  constructor(private fb: FormBuilder, private rolesService: RolesBdService) {
    this.changePasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.changePasswordForm.invalid) return;

    try{
        const authResponse= await this._authService.signUp(
        {email: this.changePasswordForm.value.email ?? '', password: this.changePasswordForm.value.password ?? ''}

      );

      if (authResponse.error) throw new Error(authResponse.error.message);

    } catch (error) {
      console.error(error);
    }
    this.changePasswordForm.reset();
  }
}

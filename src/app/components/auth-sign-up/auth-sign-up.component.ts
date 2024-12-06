import { AuthService } from './../Auth/auth.service';
import { Component, inject } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RolesBdService } from '../../services/roles-bd.service';

interface SignUpForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-auth-sign-up',
  standalone: true,
  imports: [ ReactiveFormsModule],
  providers: [AuthService, RolesBdService],
  templateUrl: './auth-sign-up.component.html',
  styleUrl: './auth-sign-up.component.css'
})

export class AuthSignUpComponent {

  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);

  form = this._formBuilder.group<SignUpForm>({
    email: this._formBuilder.control<string | null>(null, [Validators.required, Validators.email]),
    password: this._formBuilder.control<string | null>(null, [Validators.required]),
  });

  constructor(private router: Router, private rolesBdService: RolesBdService) {}

  async submit(nombre: HTMLInputElement, apellido: HTMLInputElement) {
    if (this.form.invalid) return;

    try{
        const authResponse= await this._authService.signUp(
        {email: this.form.value.email ?? '', password: this.form.value.password ?? ''}

      );

      if (authResponse.error) throw new Error(authResponse.error.message);

    } catch (error) {
      console.error(error);
    }
    this.agregarRol(this.form, nombre, apellido);
    this.form.reset();
  }

  navegarALogin() {
    this.router.navigate(['/auth-login']);
  }

  agregarRol(form: FormGroup, nombre?: HTMLInputElement, apellido?: HTMLInputElement) {
    if (form.valid) {

      const formData = {
        email: form.value.email,
        password: form.value.password,
        rol : 'asistente',
        nombre: '',
        apellido: ''
      };

      if (nombre && apellido) {
        formData['nombre'] = nombre.value;
        formData['apellido'] = apellido.value;
      }

      console.log('Formulario enviado:', formData);
      this.rolesBdService.insertarUsuarioDB(formData);

    } else {
      console.log('Formulario no válido');
    }
  }
}



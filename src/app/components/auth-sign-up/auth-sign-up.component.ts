import { AuthService } from './../Auth/auth.service';
import { Component, inject } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface SignUpForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-auth-sign-up',
  standalone: true,
  imports: [ ReactiveFormsModule],
  templateUrl: './auth-sign-up.component.html',
  styleUrl: './auth-sign-up.component.css'
})

export class AuthSignUpComponent {

  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);

  form = this._formBuilder.group<SignUpForm>({
    email: this._formBuilder.control<string | null>(null, [Validators.required, Validators.email]),
    password: this._formBuilder.control<string | null>(null, [Validators.required])
  });

  constructor(private router: Router) {}

  async submit() {
    if (this.form.invalid) return;

    try{
      const authResponse= await this._authService.singUp(
        {email: this.form.value.email ?? '', password: this.form.value.password ?? ''}

      );

      if (authResponse.error) throw new Error(authResponse.error.message);

    } catch (error) {
      console.error(error);
    }
    this.form.reset();
  }

  navegarALogin() {
    this.router.navigate(['/auth-login']);
  }

}



import { Component, Input, OnInit, inject,ChangeDetectorRef, AfterViewInit } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { AuthSession } from '@supabase/supabase-js'
import { ReactiveFormsModule } from '@angular/forms'
import { AuthService } from '../Auth/auth.service'
import { Router } from '@angular/router'
import { CommonModule } from '@angular/common'


interface LoginForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule],
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.css',
  schemas: [],
})
export class AuthLoginComponent {
  showMenu = false;
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  form = this._formBuilder.group<LoginForm>({
    email: this._formBuilder.control<string | null>(null, [Validators.required, Validators.email]),
    password: this._formBuilder.control<string | null>(null, [Validators.required])
  });

  constructor(private cdr: ChangeDetectorRef) {}

  async submit() {
    if (this.form.invalid) return;

    try{
      const {error}= await this._authService.logIn(
        {email: this.form.value.email ?? '', password: this.form.value.password ?? ''}

      );

      if (error) throw error;


      this._router.navigate(['/layout/dashboard']);

    } catch (error) {
      if (error instanceof Error) {
        alert("Revise sus credenciales");
    }
    this.form.reset();
  }

  }
}

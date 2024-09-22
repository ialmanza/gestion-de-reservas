import {Component} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, NgForm} from '@angular/forms';

@Component({
  selector: 'app-administrador-form',
  standalone: true,
  imports: [ MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './administrador-form.component.html',
  styleUrl: './administrador-form.component.css'
})
export class AdministradorFormComponent {


  onSubmit(form: NgForm) {
    if (form.valid) {
      const formData = {
        email: form.value.floating_email,
        password: form.value.floating_password,
        confirmPassword: form.value.repeat_password,
        firstName: form.value.floating_first_name,
        lastName: form.value.floating_last_name,
        phone: form.value.floating_phone
      };

      console.log('Formulario enviado:', formData);
      // EN DESARROLLO
    } else {
      console.log('Formulario no válido');
    }
  }
}

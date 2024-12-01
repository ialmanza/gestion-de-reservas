import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as bcrypt from 'bcryptjs';
import { RolesBdService } from '../../services/roles-bd.service';


@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule ],
  providers: [ RolesBdService],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent {

  roleForm: FormGroup;
  roles: any[] = [];

  constructor(private fb: FormBuilder, private rolesBdService: RolesBdService) {

    this.roleForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      rol: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }


  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }


  onSubmit() {
    if (this.roleForm.valid) {
      const hashedPassword = bcrypt.hashSync(this.roleForm.value.password, 10); // Encriptamos la contraseña
      const newRole = {
        nombre: this.roleForm.value.nombre,
        apellido: this.roleForm.value.apellido,
        email: this.roleForm.value.email,
        password: hashedPassword, // Guardamos la contraseña encriptada
        rol: this.roleForm.value.rol
      };
      this.roles.push(newRole);
      //this.rolesService.addRole(newRole);
      this.roleForm.reset();
      alert('Usuario agregado exitosamente');
    }
  }


  onDelete(email: string) {
    this.roles = this.roles.filter(role => role.email !== email);
  }


  onEdit(role: any) {
    this.roleForm.patchValue({
      nombre: role.nombre,
      apellido: role.apellido,
      email: role.email,
      rol: role.rol
    });

  }

  insertarRolDB() {
    if (this.roleForm.invalid) {
      return;
    }
    this.rolesBdService.insertarUsuarioDB({
      nombre: this.roleForm.value.nombre,
      apellido: this.roleForm.value.apellido,
      email: this.roleForm.value.email,
      rol: this.roleForm.value.rol
    });
    this.roleForm.reset();
  }
}


import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { RolesService } from '../../services/roles.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-roles-table',
  standalone: true,
  templateUrl: './roles-table.component.html',
  imports: [ReactiveFormsModule, CommonModule],
  styleUrls: ['./roles-table.component.css']
})
export class RolesTableComponent implements OnInit {
  roles: any[] = [];
  editRoleForm: FormGroup;
  @ViewChild('editModal') editModal!: TemplateRef<any>;
  selectedRole: any;
  isModalOpen = false;

  constructor(private rolesService: RolesService, private fb: FormBuilder) {
    this.editRoleForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rol: ['', Validators.required]
    });
  }

  ngOnInit(): void {

    this.rolesService.getRoles().subscribe((roles) => {
      this.roles = roles;
    });
  }


  openEditModal(role: any) {
    this.selectedRole = role;
    this.editRoleForm.patchValue({
      nombre: role.nombre,
      apellido: role.apellido,
      email: role.email,
      rol: role.rol
    });
    this.isModalOpen = true;
  }


  onSubmit() {
    if (this.editRoleForm.valid) {
      const updatedRole = this.editRoleForm.value;
      this.rolesService.updateRole(updatedRole);
      this.isModalOpen = false;
    }
  }


  closeModal() {
    this.isModalOpen = false;
  }


  onDelete(email: string) {
    this.rolesService.deleteRole(email);
  }

}

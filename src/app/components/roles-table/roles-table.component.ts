
import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RolesBdService } from '../../services/roles-bd.service';

@Component({
  selector: 'app-roles-table',
  standalone: true,
  templateUrl: './roles-table.component.html',
  imports: [ReactiveFormsModule, CommonModule],
  providers: [RolesBdService],
  styleUrls: ['./roles-table.component.css']
})
export class RolesTableComponent {
  roles: any[] = [];
  editRoleForm: FormGroup;
  @ViewChild('editModal') editModal!: TemplateRef<any>;
  selectedRole: any;
  isModalOpen = false;
  rolesDBService = inject(RolesBdService);

  constructor( private fb: FormBuilder, private rolesBdService: RolesBdService) {
    this.editRoleForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rol: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.rolesBdService.getRolesDB().then((roles : any[]) => {
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
      this.rolesBdService.editarRolDB(updatedRole);
      this.isModalOpen = false;
    }
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onDelete(email: string) {
    this.rolesBdService.eliminarRolDb(email);
  }

}


import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../Auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'flowbite'


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isSidebarOpen: boolean = false;
  private authSubscription: Subscription | undefined;
  private _authService = inject(AuthService)

  constructor(private router: Router, private authService: AuthService, private cdr: ChangeDetectorRef) {}


  async logout() {
    await this._authService.signOut();
    this.router.navigate(['/admin']);
   }

   toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

}

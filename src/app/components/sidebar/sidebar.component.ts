import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../Auth/auth.service';
import { Router } from '@angular/router';
import 'flowbite'


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ RouterLink, RouterLinkActive ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  private _authService = inject(AuthService)

  constructor(private router: Router) {}

  async logout() {
    await this._authService.signOut();
    this.router.navigate(['/admin']);
   }

}

import { Component, inject } from '@angular/core';
import { AuthService } from '../Auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  private _authService = inject(AuthService)

  constructor(private router: Router) {}


  ngOnInit(): void {
    // Selecciona el botón de alternancia del menú y el contenedor del menú
    const menuToggle = document.getElementById('menu-toggle');
    const navbarMenu = document.getElementById('navbar-multi-level');

    // Verifica si ambos elementos existen
    if (menuToggle && navbarMenu) {
      // Agrega un event listener al botón para alternar la clase 'hidden' del menú
      menuToggle.addEventListener('click', () => {
        navbarMenu.classList.toggle('hidden');
      });
    }
  }


  async logout() {
    await this._authService.signOut();
    this.router.navigate(['/admin']);
   }
}

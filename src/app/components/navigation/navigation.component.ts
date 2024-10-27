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

  }


  async logout() {
    await this._authService.signOut();
    this.router.navigate(['/admin']);
   }
}

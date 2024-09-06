import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private router: Router) { }

  navegarALogin(){
    this.router.navigate(['/login']);
  }
}

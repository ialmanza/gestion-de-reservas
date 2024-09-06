import { SignInWithPasswordCredentials, SignUpWithPasswordCredentials, SupabaseClient } from '@supabase/supabase-js';
import {Injectable, inject} from '@angular/core';
import { SupabaseService } from '../../shared/data-acces/supabase.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _supabaseClient = inject(SupabaseService).supabaseClient;

  private authStateSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  authState: Observable<boolean> = this.authStateSubject.asObservable();


  private isAuthenticated(): boolean {
    const usuariologueado = localStorage.getItem('usuariologueado');
    return usuariologueado === 'true';
  }

  session( ) {
    return this._supabaseClient.auth.getSession();

  }

  singUp(credentials: SignUpWithPasswordCredentials) {
    localStorage.setItem('usuariologueado','true');
    this.authStateSubject.next(true);
    return this._supabaseClient.auth.signUp(credentials);
  }

  logIn(credentials: SignInWithPasswordCredentials) {
    localStorage.setItem('usuariologueado','true');
    this.authStateSubject.next(true);
    return this._supabaseClient.auth.signInWithPassword(credentials);
  }

  signOut() {
    localStorage.removeItem('usuariologueado');
    this.authStateSubject.next(false);
    this._supabaseClient.auth.signOut();
  }




}

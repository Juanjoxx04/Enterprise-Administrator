import { computed, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { delay, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly tokenKey = 'authToken';
  private _token = signal<string | null>(localStorage.getItem(this.tokenKey));

  isAuthenticated = computed(() => !!this._token());

  constructor(private router: Router) { }

  login(email: string, password: string): Observable<string> {
    if (email === 'admin@admin.com' && password === '12345678') {
      const fakeToken = this.generateFakeToken();
      return of(fakeToken).pipe(
        delay(3000),
      );
    }
    return throwError(() => new Error('Credenciales invalidas'));
  }

  setSession(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this._token.set(token);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this._token.set(null);
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    return this._token();
  }

  private generateFakeToken(): string {
    return btoa(JSON.stringify({
      user: 'admin',
      role: 'SUPER_ADMIN',
      exp: Date.now() + 1000 * 60 * 60

    }));
  }

}
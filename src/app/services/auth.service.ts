import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(correo: string, contrasenha: string): Observable<boolean> {
    return this.http.post<{token: string}>('https://sayoe-v2.herokuapp.com/api/v1/auth/login', { correo, contrasenha })
        .pipe(
            map(result => {
              localStorage.setItem('access_token', result.token);
              return true;
            })
        );
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }
}

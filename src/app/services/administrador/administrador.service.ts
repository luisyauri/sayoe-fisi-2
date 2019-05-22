import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PsicologoNuevo } from 'src/app/models/psicologoNuevo';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {
  headers = new HttpHeaders();
  API_URI = 'https://sayoe-v2.herokuapp.com/api/v1/unayoe-perfiles';
  API_URI2 = 'https://sayoe-v2.herokuapp.com/api/v1/unayoe-perfil';
  constructor(private http: HttpClient) { }

  getUnayoePerfiles() {
    return this.http.get(this.API_URI, {
      headers: new HttpHeaders()
          .append('Content-Type', 'application/json')
          .append('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    });
  }

  registrarPsicologo(datos: PsicologoNuevo) {
    return this.http.post(this.API_URI2, datos, {
      headers: new HttpHeaders()
          .append('Content-Type', 'application/json')
          .append('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    });

  }
}

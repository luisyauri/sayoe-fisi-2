import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PsicologoNuevo} from 'src/app/models/psicologoNuevo';
import * as jwt_decode from 'jwt-decode';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {
  headers = new HttpHeaders();
  API_URI = environment.api + 'unayoe-perfiles';
  API_URI2 = environment.api + 'unayoe-perfil';
  API_URI3 = environment.api + 'unayoe-perfil/short/';
  API_ESTADO_ACTIVAR = environment.api + 'unayoe-perfil/activar/'
  API_ESTADO_DESACTIVAR = environment.api + 'unayoe-perfil/desactivar/'
  idAdministrador: any;

  constructor(private http: HttpClient) {
  }

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

  getDatoAdministrador() {
    const decodToken = jwt_decode(localStorage.getItem('access_token'));
    this.idAdministrador = decodToken.sub;
    console.log(this.idAdministrador);
    return this.http.get(this.API_URI3 + this.idAdministrador, {
      headers: new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    });
  }

  getEstadoActivar(id: string) {
    return this.http.get(this.API_ESTADO_ACTIVAR + id, {
      headers: new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    });
  }

  getEstadoDesactivar(id: string) {
    return this.http.get(this.API_ESTADO_DESACTIVAR + id, {
      headers: new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    });
  }
}

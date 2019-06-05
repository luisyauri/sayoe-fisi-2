import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AlumnoService} from './alumno.service';

@Injectable({
  providedIn: 'root'
})
export class EPPendienteService {
  //Variables
  headers = new HttpHeaders();

  // URL
  API_LISTA_E_P_PENDIENTES = 'https://sayoe-v2.herokuapp.com/api/v1/unayoe-perfil/short/';
  API_ENVIAR_RESPUESTA_E_P = 'https://sayoe-v2.herokuapp.com/api/v1/unayoe-perfil/short/';

  constructor(private http: HttpClient, private alumnoService: AlumnoService) {
  }

  getEPPendientes() {
    return this.http.get(this.API_LISTA_E_P_PENDIENTES + this.alumnoService.getIdAlumno(), {
      headers: new HttpHeaders()
          .append('Content-Type', 'application/json')
          .append('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    });
  }

}

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PerfilPsicoAlumnoService {

  //Variables
  headers = new HttpHeaders();

  // URL
  API_LIST_PERFILES_ALUMNO = environment.api+'perfiles/alumno/';

  constructor(private http: HttpClient) {
  }


  getListPerfilAlumno(codigo: string) {
    return this.http.get(this.API_LIST_PERFILES_ALUMNO+codigo, {
      headers: new HttpHeaders()
          .append('Content-Type', 'application/json')
          .append('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    });
  }
}

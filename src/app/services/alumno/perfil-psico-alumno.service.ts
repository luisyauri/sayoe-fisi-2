import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PerfilPsicoAlumnoService {

  //Variables
  headers = new HttpHeaders();

  // URL
  API_LIST_PERFILES_ALUMNO = 'https://sayoe-v2.herokuapp.com/api/v1/perfiles/alumno/';

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

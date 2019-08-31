import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SendRecomPPUnayoeModel} from '../../models/unayoe/perfi-psi-pend-unayoe/sendRecomPPUnayoe.model';
import {EnviarAlumnoUnayoeModel} from '../../models/unayoe/alumnos-unayoe/enviarAlumnoUnayoe.model';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AlumnosUnayoeService {

  // Variables
  headers = new HttpHeaders();
  API_LIST_ALUMNOS = environment.api + 'alumnos';
  API_AGREGAR_UN_ALUMNO = environment.api + 'alumno'

  // Constructor
  constructor(private http: HttpClient) {
  }

  //Metodos

  getListAlumnos() {
    return this.http.get(this.API_LIST_ALUMNOS, {
      headers: new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    });
  }

  agregarUnAlumno(enviarAlumno: EnviarAlumnoUnayoeModel) {
    return this.http.post(this.API_AGREGAR_UN_ALUMNO, enviarAlumno, {
      headers: new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    });
  }
}

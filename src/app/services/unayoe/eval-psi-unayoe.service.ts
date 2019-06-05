import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {DatosActualizarUnayoe} from '../../models/unayoe/mi-perfil-unayoe/datosActualizarUnayoe.model';
import {Observable} from 'rxjs';
import {AsignarAlumnoUnayoe} from '../../models/unayoe/evaluaciones-psicologicas-unayoe/asignarAlumnoUnayoe.model';

@Injectable({
  providedIn: 'root'
})
export class EvalPsiUnayoeService {

  // Variables
  headers = new HttpHeaders();
  API_EVALUACIONES_PSICOLOGICAS = 'https://sayoe-v2.herokuapp.com/api/v1/cuestionario-evaluaciones';
  API_DATOS_UN_ALUMNO = 'https://sayoe-v2.herokuapp.com/api/v1/alumnoShortAsignar/';
  API_DATOS_UNA_EVALUACION_PSICOLOGICA = 'https://sayoe-v2.herokuapp.com/api/v1/cuestionario-evaluacion/';
  API_ASIGNAR_ALUMNO = 'https://sayoe-v2.herokuapp.com/api/v1/asignarAlumno';

  // Constructor
  constructor(private http: HttpClient) { }

  //Metodos

  getEvaluacionesPsicologicas() {
    return this.http.get(this.API_EVALUACIONES_PSICOLOGICAS, {
      headers: new HttpHeaders()
          .append('Content-Type', 'application/json')
          .append('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    });
  }

  getDatosUnEstudiante(codigo:string) {
    return this.http.get(this.API_DATOS_UN_ALUMNO+codigo, {
      headers: new HttpHeaders()
          .append('Content-Type', 'application/json')
          .append('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    });
  }

  getUnaEvaluacionPsicologica(id:string) {
    return this.http.get(this.API_DATOS_UNA_EVALUACION_PSICOLOGICA+id, {
      headers: new HttpHeaders()
          .append('Content-Type', 'application/json')
          .append('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    });
  }
  getAsignar(asignarAlumnoUnayoe: AsignarAlumnoUnayoe): Observable<AsignarAlumnoUnayoe>{
    return this.http.post<AsignarAlumnoUnayoe>(this.API_ASIGNAR_ALUMNO, asignarAlumnoUnayoe, {
      headers: new HttpHeaders()
          .append('Content-Type', 'application/json')
          .append('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    });
  }

}

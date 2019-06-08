import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AlumnoService} from './alumno.service';
import {Observable} from 'rxjs';
import {EnviarMesAnhoPendienteModel} from '../../models/alumno/e-p-pendientes-alumno/enviarMesAnhoPendiente.model';
import {EnviarRespuestaEPModel} from '../../models/alumno/e-p-pendientes-alumno/enviarRespuesaEP.model';

@Injectable({
  providedIn: 'root'
})
export class EPPendienteAlumnoService {
  //Variables
  headers = new HttpHeaders();

  // URL
  API_LISTA_E_P_PENDIENTES = 'https://sayoe-v2.herokuapp.com/api/v1/evaluaciones_asignadas/pendientes';
  AP_UNA_EP = 'https://sayoe-v2.herokuapp.com/api/v1/cuestionario-evaluacion/';
  API_ENVIAR_RESPUESTA_E_P = 'https://sayoe-v2.herokuapp.com/api/v1/inventario-estudio';

  constructor(private http: HttpClient, private alumnoService: AlumnoService) {
  }

  getUnaEP(id: string){
    return this.http.get(this.AP_UNA_EP+id,{
      headers: new HttpHeaders()
              .append('Content-Type', 'application/json')
              .append('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    });

  }

  getEnviarMesAnho(enviarMesAnho: EnviarMesAnhoPendienteModel){
    return this.http.post(this.API_LISTA_E_P_PENDIENTES, enviarMesAnho, {
      headers: new HttpHeaders()
          .append('Content-Type', 'application/json')
          .append('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    });
  }

  postEnviarRespuesta(enviarRespuestaEP: EnviarRespuestaEPModel){
    return this.http.post(this.API_ENVIAR_RESPUESTA_E_P, enviarRespuestaEP, {
      headers: new HttpHeaders()
          .append('Content-Type', 'application/json')
          .append('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    });
  }

  // getEnviarMesAnho(enviarMesAnho: EnviarMesAnhoPendienteModel): Observable<EnviarMesAnhoPendienteModel>{
  //   return this.http.post<EnviarMesAnhoPendienteModel>(this.API_LISTA_E_P_PENDIENTES, enviarMesAnho, {
  //     headers: new HttpHeaders()
  //         .append('Content-Type', 'application/json')
  //         .append('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
  //   });
  // }

}

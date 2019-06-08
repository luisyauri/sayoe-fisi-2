import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AlumnoService} from './alumno.service';
import {EnviarMesAnhoRealizadoModel} from '../../models/alumno/e-p-realizadas-alumno/enviarMesAnhoRealizado.model';

@Injectable({
  providedIn: 'root'
})
export class EPRealizadaAlumnoService {

  //Variables
  headers = new HttpHeaders()

  // URL
  API_LISTA_E_P_REALIZADAS = 'https://sayoe-v2.herokuapp.com/api/v1/evaluaciones_asignadas/realizadas';
  AP_RESPUESTA_UNA_EP = '';
  constructor(private http: HttpClient, private alumnoService: AlumnoService) {
  }

  getEnviarMesAnho(enviarMesAnho: EnviarMesAnhoRealizadoModel){
    return this.http.post(this.API_LISTA_E_P_REALIZADAS, enviarMesAnho, {
      headers: new HttpHeaders()
          .append('Content-Type', 'application/json')
          .append('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    });
  }

}

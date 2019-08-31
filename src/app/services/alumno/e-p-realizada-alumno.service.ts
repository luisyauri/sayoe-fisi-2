import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AlumnoService} from './alumno.service';
import {EnviarMesAnhoRealizadoModel} from '../../models/alumno/e-p-realizadas-alumno/enviarMesAnhoRealizado.model';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EPRealizadaAlumnoService {

  //Variables
  headers = new HttpHeaders()

  // URL
  API_LISTA_E_P_REALIZADAS = environment.api+'evaluaciones_asignadas/realizadas';
  API_RESULTADO_UNA_E_P_REALIZADA = environment.api+'resultado/';

  constructor(private http: HttpClient, private alumnoService: AlumnoService) {
  }

  getEnviarMesAnho(enviarMesAnho: EnviarMesAnhoRealizadoModel){
    return this.http.post(this.API_LISTA_E_P_REALIZADAS, enviarMesAnho, {
      headers: new HttpHeaders()
          .append('Content-Type', 'application/json')
          .append('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    });
  }

  getUnResultadoEP(id_estado_perfil: string){
    return this.http.get(this.API_RESULTADO_UNA_E_P_REALIZADA+id_estado_perfil,{
      headers: new HttpHeaders()
          .append('Content-Type', 'application/json')
          .append('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    });
  }

}

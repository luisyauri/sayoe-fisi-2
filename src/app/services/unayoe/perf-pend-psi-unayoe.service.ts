import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SendAnhoMesPPUnayoeModel} from '../../models/unayoe/perfi-psi-pend-unayoe/sendAnhoMesPPUnayoe.model';
import {SendRecomPPUnayoeModel} from '../../models/unayoe/perfi-psi-pend-unayoe/sendRecomPPUnayoe.model';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PerfPendPsiUnayoeService {
  // Variables
  headers = new HttpHeaders();
  // URL
  API_LIST_PERF_PEND_PSICO = environment.api+'perfiles-psicologicos';
  API_GET_DATA_DIALOG_PEND_PSICO = environment.api+'perfil/';
  API_SEND_RECOMENDACION_DIALOG_PEND_PSICO = environment.api+'recomendar';

  // Constructor
  constructor(private http: HttpClient){ }

  // Métodos
  getEnviarMesAnho(enviarMesAnho: SendAnhoMesPPUnayoeModel){
    return this.http.post(this.API_LIST_PERF_PEND_PSICO, enviarMesAnho, {
      headers: new HttpHeaders()
          .append('Content-Type', 'application/json')
          .append('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    });
  }

  getDataDialogPendPisco(id_perfil_psicologico: string) {
    return this.http.get(this.API_GET_DATA_DIALOG_PEND_PSICO+id_perfil_psicologico, {
      headers: new HttpHeaders()
          .append('Content-Type', 'application/json')
          .append('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    });
  }

  sendRecomendacionDialogPendPisco(dataRecomendacion: SendRecomPPUnayoeModel){
    return this.http.post(this.API_SEND_RECOMENDACION_DIALOG_PEND_PSICO, dataRecomendacion, {
      headers: new HttpHeaders()
          .append('Content-Type', 'application/json')
          .append('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    });
  }
}

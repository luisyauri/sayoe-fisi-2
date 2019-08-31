import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SendAnhoMesPPUnayoeModel} from '../../models/unayoe/perfi-psi-pend-unayoe/sendAnhoMesPPUnayoe.model';
import {SendAnhoMesPNCUnayoeModel} from '../../models/unayoe/perf-psi-no-culm-unayoe/sendAnhoMesPNCUnayoe.model';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PerfNoCulmPsiUnayoeService {

  //Variables
  headers = new HttpHeaders();

  // URL
  API_LIST_NO_CULM_PSICO = environment.api+'perfiles-no-culminados';
  API_FINALIZAR_NO_CULM_PSICO = environment.api+'finalizar-perfil/';

  constructor(private http: HttpClient) { }

  // Métodos
  getEnviarMesAnho(enviarMesAnho: SendAnhoMesPNCUnayoeModel){
    return this.http.post(this.API_LIST_NO_CULM_PSICO, enviarMesAnho, {
      headers: new HttpHeaders()
          .append('Content-Type', 'application/json')
          .append('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    });
  }

  finalizarPerfilPsicologico(id_perfil: string) {
    return this.http.get(this.API_FINALIZAR_NO_CULM_PSICO+id_perfil, {
      headers: new HttpHeaders()
          .append('Content-Type', 'application/json')
          .append('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    });
  }
}

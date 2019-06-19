import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SenAnhoMesPRUnayoeModel} from '../../models/unayoe/peri-psi-real-unayoe/senAnhoMesPRUnayoe';

@Injectable({
  providedIn: 'root'
})
export class PerfRealiPsiUnayoeService {

  // Variables
  headers = new HttpHeaders();
  // URL
  API_LIST_PERF_REAL_PSICO = 'https://sayoe-v2.herokuapp.com/api/v1/recomendaciones';

  // Constructor
  constructor(private http: HttpClient){ }

  // Métodos
  getEnviarMesAnho(enviarMesAnho: SenAnhoMesPRUnayoeModel){
    return this.http.post(this.API_LIST_PERF_REAL_PSICO, enviarMesAnho, {
      headers: new HttpHeaders()
          .append('Content-Type', 'application/json')
          .append('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    });
  }
}

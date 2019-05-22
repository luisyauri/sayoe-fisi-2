import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EvalPsiUnayoeService {

  headers = new HttpHeaders();
  API_URI = 'https://sayoe-v2.herokuapp.com/api/v1/cuestionario-evaluaciones';
  constructor(private http: HttpClient) { }

  /*private extractData(res: Response) {
    let body = res;
    return body || { };
  }*/

  getEvaluacionesPsicologicas() {
    return this.http.get(this.API_URI, {
      headers: new HttpHeaders()
          .append('Content-Type', 'application/json')
          .append('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    });
  }
}

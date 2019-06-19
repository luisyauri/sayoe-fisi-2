import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  //Variables
  headers = new HttpHeaders();

  // URL
  API_LIST_CITAS = 'https://sayoe-v2.herokuapp.com/api/v1/citas/alumno/';

  constructor(private http: HttpClient) {
  }

  getListCitas(codigo: string) {
    return this.http.get(this.API_LIST_CITAS + codigo, {
      headers: new HttpHeaders()
          .append('Content-Type', 'application/json')
          .append('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    });
  }
}

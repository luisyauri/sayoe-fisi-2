import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SendRecomDetallePPUnayoeModel} from '../../models/unayoe/detalle-perf-psi-unayoe/sendRecomDetallePPUnayoe.model';

@Injectable({
  providedIn: 'root'
})
export class DetallerAlumnoUnayoeService {

  //Variables
  headers = new HttpHeaders();

  // URL
  API_DETALLE_DATA_ALUMNO = 'https://sayoe-v2.herokuapp.com/api/v1/alumno/{codigo}';
  API_LIST_PERFILES_PSICOLOGICOS = 'https://sayoe-v2.herokuapp.com/api/v1/perfiles/alumno/';

  // Constructor
  constructor(private http: HttpClient) { }

  //Metodos
  getDetalleAlumno(codigo: string) {
    return this.http.get(this.API_DETALLE_DATA_ALUMNO+codigo, {
      headers: new HttpHeaders()
          .append('Content-Type', 'application/json')
          .append('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    });
  }
  getListPerfilAlumno(codigo: string) {
    return this.http.get(this.API_LIST_PERFILES_PSICOLOGICOS+codigo, {
      headers: new HttpHeaders()
          .append('Content-Type', 'application/json')
          .append('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    });
  }

}

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UnayoeService} from './unayoe.service';
import {Observable} from 'rxjs';
import {DatosActualizarUnayoe} from '../../models/unayoe/mi-perfil-unayoe/datosActualizarUnayoe.model';

@Injectable({
  providedIn: 'root'
})
export class MiPerfilUnayoeService {
  // Variables
  headers = new HttpHeaders();
  // URL
  API_PERFIL_UNAYOE= 'https://sayoe-v2.herokuapp.com/api/v1/unayoe-perfil/';
  API_UPDATE_PERFIL_UNAYOE = 'https://sayoe-v2.herokuapp.com/api/v1/unayoe-perfil/';

  // Constructor
  constructor(private http: HttpClient, private unayoeService: UnayoeService) { }

  // Métodos
  getPerfilUnayoe() {
    return this.http.get(this.API_PERFIL_UNAYOE + this.unayoeService.getIdUnayoe(), {
      headers: new HttpHeaders()
          .append('Content-Type', 'application/json')
          .append('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    });
  }
  updateDataPerfilUnatyoe(datosActualizados: DatosActualizarUnayoe): Observable<DatosActualizarUnayoe>{
    return this.http.put<DatosActualizarUnayoe>(this.API_UPDATE_PERFIL_UNAYOE + this.unayoeService.getIdUnayoe(), datosActualizados, {
      headers: new HttpHeaders()
          .append('Content-Type', 'application/json')
          .append('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { datosNuevos } from '../views/unayoe/mi-perfil-unayoe/mi-perfil-unayoe.component';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MiPerfilService {

  headers = new HttpHeaders();
  API_URI= 'https://sayoe-v2.herokuapp.com/api/v1/unayoe-perfil/1';

  constructor( private http: HttpClient ) { }
  /*private extractData(res: Response) {
    let body = res;
    return body || { };
  }*/
  getPerfil(){
    return this.http.get(this.API_URI, { 
      headers: new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Authorization', 'Bearer ' + localStorage.getItem('access_token')) 
      });
  }

  actualizarDatos(datosActualizados: datosNuevos): Observable<datosNuevos>{
    return this.http.put<datosNuevos>(this.API_URI, datosActualizados, { 
      headers: new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Authorization', 'Bearer ' + localStorage.getItem('access_token')) 
      });
  }
  
}

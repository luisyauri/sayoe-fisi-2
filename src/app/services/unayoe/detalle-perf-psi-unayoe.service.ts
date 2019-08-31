import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SendRecomPPUnayoeModel} from '../../models/unayoe/perfi-psi-pend-unayoe/sendRecomPPUnayoe.model';
import {SendRecomDetallePPUnayoeModel} from '../../models/unayoe/detalle-perf-psi-unayoe/sendRecomDetallePPUnayoe.model';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DetallePerfPsiUnayoeService {
  //Variables
  headers = new HttpHeaders();

  // URL
  API_DETALLE_DATA_PERFIL_PSICOLOGICO = environment.api+'perfil/';
  API_SEND_RECOMENDACION_DIALOG_PEND_PSICO = environment.api+'recomendar';

  // Constructor
  constructor(private http: HttpClient) { }

  //Metodos
  getDetallePerfilPsicologico(idPerfilPsicologico: string) {
    console.log("entro2");
    return this.http.get(this.API_DETALLE_DATA_PERFIL_PSICOLOGICO+idPerfilPsicologico, {
      headers: new HttpHeaders()
          .append('Content-Type', 'application/json')
          .append('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    });
  }
  sendRecomendacionDialogPendPisco(dataRecomendacion: SendRecomDetallePPUnayoeModel){
    return this.http.post(this.API_SEND_RECOMENDACION_DIALOG_PEND_PSICO, dataRecomendacion, {
      headers: new HttpHeaders()
          .append('Content-Type', 'application/json')
          .append('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    });
  }
}

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SendRecomPPUnayoeModel} from '../../models/unayoe/perfi-psi-pend-unayoe/sendRecomPPUnayoe.model';
import {SendRecomDetallePPUnayoeModel} from '../../models/unayoe/detalle-perf-psi-unayoe/sendRecomDetallePPUnayoe.model';

@Injectable({
  providedIn: 'root'
})
export class DetallePerfPsiUnayoeService {
  //Variables
  headers = new HttpHeaders();

  // URL
  API_DETALLE_DATA_PERFIL_PSICOLOGICO = 'https://sayoe-v2.herokuapp.com/api/v1/perfil/';
  API_SEND_RECOMENDACION_DIALOG_PEND_PSICO = 'https://sayoe-v2.herokuapp.com/api/v1/recomendar';

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

import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AlumnoService} from '../../../services/alumno/alumno.service';
import {EnviarMesAnhoPendienteModel} from '../../../models/alumno/e-p-pendientes-alumno/enviarMesAnhoPendiente.model';

@Component({
  selector: 'app-eval-psi-real-alumno',
  templateUrl: './eval-psi-real-alumno.component.html',
  styleUrls: ['./eval-psi-real-alumno.component.css']
})
export class EvalPsiRealAlumnoComponent implements OnInit {

  //Variables
  headers = new HttpHeaders();

  //URL
  API_LISTA_E_P_REALIZADOS = 'https://sayoe-v2.herokuapp.com/api/v1/evaluaciones_asignadas/realizadas';
  AP_RESPUESTA_UNA_EP = '';

  //Constructor
  constructor(private http: HttpClient, private alumnoService: AlumnoService) { }

  ngOnInit() {
  }

  //Métodos
  getEnviarMesAnho(enviarMesAnho: EnviarMesAnhoPendienteModel){
    return this.http.post(this.API_LISTA_E_P_REALIZADOS, enviarMesAnho, {
      headers: new HttpHeaders()
          .append('Content-Type', 'application/json')
          .append('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    });
  }


}

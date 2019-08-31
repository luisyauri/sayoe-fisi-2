import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EnviarAlumnoUnayoeModel} from '../../models/unayoe/alumnos-unayoe/enviarAlumnoUnayoe.model';
import {AsignarCita} from '../../models/unayoe/citas-unayoe/asignarCita';
import {CambiarEstadoModel} from '../../models/unayoe/citas-unayoe/cambiarEstado.model';
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CitasUnayoeService {

    //Variables
    headers = new HttpHeaders();

    // URL
    API_LISTA_CITAS = environment.api+'citas';
    API_ASIGNAR_CITA = environment.api+'cita';
    API_CAMBIAR_ESTADO = environment.api+'estado'

    constructor(private http: HttpClient) {
    }

    // Métodos

    getListaCitas() {
        return this.http.get(this.API_LISTA_CITAS, {
            headers: new HttpHeaders()
                .append('Content-Type', 'application/json')
                .append('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
        });
    }
    asignarCita(asignarCita: AsignarCita){
        return this.http.post(this.API_ASIGNAR_CITA, asignarCita, {
            headers: new HttpHeaders()
                .append('Content-Type', 'application/json')
                .append('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
        });
    }
    camEstado(cambiarEstado: CambiarEstadoModel){
        return this.http.post(this.API_CAMBIAR_ESTADO, cambiarEstado, {
            headers: new HttpHeaders()
                .append('Content-Type', 'application/json')
                .append('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
        });
    }
}



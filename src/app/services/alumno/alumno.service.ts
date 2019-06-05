import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class AlumnoService {
    //Variables
    headers = new HttpHeaders();

    // URL
    API_DATOS_GENERALES_ALUMNO = 'https://sayoe-v2.herokuapp.com/api/v1/alumno/short/';

    constructor(private http: HttpClient) {
    }

    // Métodos
    getIdAlumno(){
        const decodToken = jwt_decode(localStorage.getItem('access_token'));
        return decodToken.sub;
    }
    getDatosGenerales() {
        return this.http.get(this.API_DATOS_GENERALES_ALUMNO + this.getIdAlumno(), {
            headers: new HttpHeaders()
                .append('Content-Type', 'application/json')
                .append('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
        });
    }
}

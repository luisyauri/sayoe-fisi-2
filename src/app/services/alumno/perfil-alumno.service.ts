import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PerfilAlumnoService {

    //Variables
    headers = new HttpHeaders();

    // URL
    API_PERFIL_ALUMNO = 'https://sayoe-v2.herokuapp.com/api/v1/alumno/';

    constructor(private http: HttpClient) {
    }


    getPerfilAlumno(codigo: string) {
        return this.http.get(this.API_PERFIL_ALUMNO + codigo, {
            headers: new HttpHeaders()
                .append('Content-Type', 'application/json')
                .append('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
        });
    }
}

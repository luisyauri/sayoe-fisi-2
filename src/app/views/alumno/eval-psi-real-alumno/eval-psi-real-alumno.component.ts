import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AlumnoService} from '../../../services/alumno/alumno.service';
import {EnviarMesAnhoRealizadoModel} from '../../../models/alumno/e-p-realizadas-alumno/enviarMesAnhoRealizado.model';
import {getEPRealizadasModel} from '../../../models/alumno/e-p-realizadas-alumno/getEPRealizadasmodel';
import {EPRealizadaAlumnoService} from '../../../services/alumno/e-p-realizada-alumno.service';
import {getEPPendientesModel} from '../../../models/alumno/e-p-pendientes-alumno/getEPPendientes.model';
import Swal from "sweetalert2";

@Component({
    selector: 'app-eval-psi-real-alumno',
    templateUrl: './eval-psi-real-alumno.component.html',
    styleUrls: ['./eval-psi-real-alumno.component.css']
})
export class EvalPsiRealAlumnoComponent implements OnInit {

    //Variables
    enviarMesAnho: EnviarMesAnhoRealizadoModel = {codigo: '', anho: '', mes: ''};
    date = new Date();
    arrayGetEPRealizadas: getEPRealizadasModel[];
    displayedColumns: string[] = ['titulo', 'preguntas', 'acciones'];
    banderaContenido = true;

    //Constructor
    constructor(private alumnoService: AlumnoService,
                private epRealizadaAlumnoService: EPRealizadaAlumnoService,
    ) {
    }

    ngOnInit() {
        this.getEnviarMesAnho();
        this.getEPRealizadas();
    }

    //Métodos
    getEnviarMesAnho() {
        this.enviarMesAnho.codigo = this.alumnoService.getIdAlumno();
        this.enviarMesAnho.anho = this.date.getFullYear().toString();
        this.enviarMesAnho.mes = (this.date.getMonth() + 1).toString();
    }

    getEPRealizadas() {
        //Holass
        this.epRealizadaAlumnoService.getEnviarMesAnho(this.enviarMesAnho).subscribe(
            (res: getEPRealizadasModel) => {
                this.arrayGetEPRealizadas = res['data'];
                // this.getDateFormat()
                console.log(this.arrayGetEPRealizadas);
                if (this.arrayGetEPRealizadas.length < 1) {
                    this.banderaContenido = false;
                } else {
                    this.banderaContenido = true;
                }
            },
            error1 => {
                console.log('Error al extraer la lista de evaluaciones psicológicas.');
            });
    }

    respuestaEPR() {
        console.log("entro");
        Swal.fire({
            position: 'center',
            type: 'success',
            title: '¡Resultado Instantáneo!',
            html:'Usted esta loco causa',
            animation: false,
            confirmButtonText: 'Cerrar',
        })
    }
}

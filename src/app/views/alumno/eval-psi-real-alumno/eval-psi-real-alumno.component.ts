import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AlumnoService} from '../../../services/alumno/alumno.service';
import {EnviarMesAnhoRealizadoModel} from '../../../models/alumno/e-p-realizadas-alumno/enviarMesAnhoRealizado.model';
import {getEPRealizadasModel} from '../../../models/alumno/e-p-realizadas-alumno/getEPRealizadasmodel';
import {EPRealizadaAlumnoService} from '../../../services/alumno/e-p-realizada-alumno.service';
import {getEPPendientesModel} from '../../../models/alumno/e-p-pendientes-alumno/getEPPendientes.model';
import Swal from 'sweetalert2';
import {
    EncuestaBeckModel,
    EncuestaIHEModel,
    IdCuestionarioModel
} from '../../../models/alumno/e-p-pendientes-alumno/recibirRespuesta.model';
import {ResultadoBeckRealizadas, ResultadoIHERealizadas} from '../../../models/alumno/e-p-realizadas-alumno/recibirRespuesta.model';

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
    displayedColumns: string[] = ['titulo', 'preguntas', 'fecharesuelta', 'horaresuelta', 'acciones'];
    banderaContenido = true;

    //Evaluaciones
    EVALUACION_BECK: ResultadoBeckRealizadas;
    EVALUACION_IHE: ResultadoIHERealizadas;

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
        this.epRealizadaAlumnoService.getEnviarMesAnho(this.enviarMesAnho).subscribe(
            (res: getEPRealizadasModel) => {
                this.arrayGetEPRealizadas = res['data'];
                this.getDateFormat();
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

    respuestaEPR(id_cuest_eval: number, descripcion: any) {

        if (id_cuest_eval == 1) {
            if (descripcion == 'NO REALIZÓ') {
                Swal.fire({
                    position: 'center',
                    type: 'success',
                    title: '¡Resultado Instantáneo!',
                    html: descripcion,
                    animation: false,
                    confirmButtonText: 'Cerrar',
                });
            } else {
                // console.log(descripcion);
                Swal.fire({
                    position: 'center',
                    type: 'success',
                    title: '¡Resultado Instantáneo!',
                    html: 'Usted en sus Hábitos de Estudio tiene una categoría: <strong>' + descripcion.descripcion.titulo + '</strong>.<br/>' +
                        'Por lo tanto: ' + descripcion.descripcion.contenido,
                    animation: false,
                    confirmButtonText: 'Cerrar',
                });
            }
        } else if (id_cuest_eval == 2) {
            // console.log(descripcion);
            if (descripcion == 'NO REALIZÓ') {
                Swal.fire({
                    position: 'center',
                    type: 'success',
                    title: '¡Resultado Instantáneo!',
                    html: descripcion,
                    animation: false,
                    confirmButtonText: 'Cerrar',
                });
            } else {
                // console.log(descripcion);
                Swal.fire({
                    position: 'center',
                    type: 'success',
                    title: '¡Resultado Instantáneo!',
                    html: descripcion.descripcion,
                    animation: false,
                    confirmButtonText: 'Cerrar',
                });
            }
        }

        // if(id_cuest_eval == 1){
        //     this.epRealizadaAlumnoService.getUnResultadoEP(id_estado_perfil.toString()).subscribe(
        //         (res) => {
        //             this.EVALUACION_IHE = res['data'];
        //             console.log(this.EVALUACION_IHE);
        //             Swal.fire({
        //                 position: 'center',
        //                 type: 'success',
        //                 title: '¡Resultado Instantáneo!',
        //                 html:'Usted es sus Hábitos de Estudio tiene una categoría: <strong>'+this.EVALUACION_IHE.descripcion.titulo+"</strong>.<br/>"+
        //                     "Es decir: "+this.EVALUACION_IHE.descripcion.contenido,
        //                 animation: false,
        //                 confirmButtonText: 'Cerrar',
        //             });
        //         },
        //         error => {
        //             console.log(error)
        //         });
        // }
        // else if(id_cuest_eval == 2){
        //     this.epRealizadaAlumnoService.getUnResultadoEP(id_estado_perfil.toString()).subscribe(
        //         (res) => {
        //             // console.log(res);
        //             this.EVALUACION_BECK = res['data'];
        //             // console.log(this.EVALUACION_BECK);
        //             Swal.fire({
        //                 position: 'center',
        //                 type: 'success',
        //                 title: '¡Resultado Instantáneo!',
        //                 html:'Usted '+this.EVALUACION_BECK.descripcion+".",
        //                 animation: false,
        //                 confirmButtonText: 'Cerrar',
        //             });
        //         },
        //         error => {
        //             console.log(error)
        //         });
        // }else{
        // }
    }

    // respuestaEPR(id_estado_perfil: number, id_cuest_eval:number) {
    //     if(id_cuest_eval == 1){
    //         this.epRealizadaAlumnoService.getUnResultadoEP(id_estado_perfil.toString()).subscribe(
    //             (res) => {
    //                     this.EVALUACION_IHE = res['data'];
    //                     console.log(this.EVALUACION_IHE);
    //                     Swal.fire({
    //                         position: 'center',
    //                         type: 'success',
    //                         title: '¡Resultado Instantáneo!',
    //                         html:'Usted es sus Hábitos de Estudio tiene una categoría: <strong>'+this.EVALUACION_IHE.descripcion.titulo+"</strong>.<br/>"+
    //                             "Es decir: "+this.EVALUACION_IHE.descripcion.contenido,
    //                         animation: false,
    //                         confirmButtonText: 'Cerrar',
    //                     });
    //             },
    //             error => {
    //                 console.log(error)
    //             });
    //     }
    //     else if(id_cuest_eval == 2){
    //         this.epRealizadaAlumnoService.getUnResultadoEP(id_estado_perfil.toString()).subscribe(
    //             (res) => {
    //                 // console.log(res);
    //                 this.EVALUACION_BECK = res['data'];
    //                 // console.log(this.EVALUACION_BECK);
    //                 Swal.fire({
    //                     position: 'center',
    //                     type: 'success',
    //                     title: '¡Resultado Instantáneo!',
    //                     html:'Usted '+this.EVALUACION_BECK.descripcion+".",
    //                     animation: false,
    //                     confirmButtonText: 'Cerrar',
    //                 });
    //             },
    //             error => {
    //                 console.log(error)
    //             });
    //     }else{
    //
    //     }
    // }

    getDateFormat() {
        for (let i = 0; i < this.arrayGetEPRealizadas.length; i++) {
            const fechaVenci = this.arrayGetEPRealizadas[i].fecha_vencimiento;
            const dateMostrarFormat = fechaVenci.slice(8, 10) + '-' + fechaVenci.slice(5, 7) + '-' + fechaVenci.slice(0, 4);
            this.arrayGetEPRealizadas[i].fecha_vencimiento = dateMostrarFormat;
        }
    }
}

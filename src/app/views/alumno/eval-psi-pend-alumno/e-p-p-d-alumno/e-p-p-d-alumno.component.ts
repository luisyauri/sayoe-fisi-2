import {Component, OnInit} from '@angular/core';
import {EppEpService} from '../../../../services/intercambio/epp-ep.service';
import {EPPendienteAlumnoService} from '../../../../services/alumno/e-p-pendiente-alumno.service';
import {AlternativasGetUnaEPModel, GetUnaEPModel} from '../../../../models/alumno/e-p-pendientes-alumno/getUnaEP.model';
import {
    AlternativasEnviarRespuestaEPModel, EnviarRespuestaEPModel,
} from '../../../../models/alumno/e-p-pendientes-alumno/enviarRespuesaEP.model';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {ViewEncapsulation} from '@angular/core';
import {RecibirRespuestaEPModel} from '../../../../models/alumno/e-p-pendientes-alumno/recibirRespuestaEP.model';

@Component({
    selector: 'app-e-p-p-d-alumno',
    templateUrl: './e-p-p-d-alumno.component.html',
    styleUrls: ['./e-p-p-d-alumno.component.css'],
    // encapsulation: ViewEncapsulation.None
})
export class EPPDAlumnoComponent implements OnInit {

    //Variables
    id_perfil_psico: number;
    id_cuest_eval: number;
    id_estado_perfil: number;
    ep: GetUnaEPModel;
    arrayBloque = [];

    //Alternativass
    arrayAlternativasMarcadasConDeTexto: AlternativasGetUnaEPModel[] = [];
    arrayAlternativasEnviar: AlternativasEnviarRespuestaEPModel[] = [];

    //Enviar respuesta
    enviarRespuestaEP: EnviarRespuestaEPModel = {data: {id_perfil_psico: 0, id_estado_perfil: 0, alternativa: []}};

    //Constructor
    constructor(private eppEpService: EppEpService,
                private epPendienteAlumnoService: EPPendienteAlumnoService,
                private router: Router
    ) {
    }

    ngOnInit() {
        // this.id_cuest_eval = 1;
        this.getIdPerfilEvaluacionEstadoPerfil();
        this.getUnEP(this.id_cuest_eval);
        if (!this.id_cuest_eval) {
            this.router.navigate(['alumno/evaluaciones-psicologicas-pendientes']);
        }

    }

    //Métodos
    getUnEP(id: number) {
        this.epPendienteAlumnoService.getUnaEP(id.toString()).subscribe(
            (res: GetUnaEPModel) => {
                this.ep = res['data'][0];
                if (this.ep) {
                    this.getCrearVariablesAlternativas(this.ep.nro_preguntas);
                    this.getArrayBloques();
                    console.log(this.arrayAlternativasMarcadasConDeTexto);
                }
                //console.log(this.arrayAlternativasMarcadasConDeTexto);
            },
            error1 => {
                console.log('Error al extraer una evaluación psicológica.');
            });
    }

    getIdPerfilEvaluacionEstadoPerfil() {
        this.eppEpService.currendId_perfil_psico.subscribe(value => {
            this.id_perfil_psico = value;
        });
        this.eppEpService.currentId_cuest_eval.subscribe(value => {
            this.id_cuest_eval = value;

        });
        this.eppEpService.currentId_estado_perfil.subscribe(value => {
            this.id_estado_perfil = value;
        })
    }

    getCrearVariablesAlternativas(numeroAlternativas) {
        for (let i = 1; i <= numeroAlternativas; i++) {
            this.arrayAlternativasMarcadasConDeTexto.push({id: -1, id_pregunta: -1, puntuacion: -1, descripcion: ''});
        }
    }

    getAlternativasEnviar(marcadasTexto: AlternativasGetUnaEPModel[]) {
        for (let alternativa of marcadasTexto) {
            this.arrayAlternativasEnviar.push({
                id: alternativa.id,
                id_pregunta: alternativa.id_pregunta,
                puntuacion: alternativa.puntuacion
            });
        }
    }

    getArrayEnvio() {
        this.getAlternativasEnviar(this.arrayAlternativasMarcadasConDeTexto);
        this.enviarRespuestaEP.data.id_perfil_psico = this.id_perfil_psico;
        this.enviarRespuestaEP.data.id_estado_perfil = this.id_estado_perfil;
        this.enviarRespuestaEP.data.alternativa = this.arrayAlternativasEnviar;
    }

    //ObtenerArreglo
    getArrayBloques() {
        for (let pregunta of this.ep.preguntas) {
            if (!this.existe(pregunta.bloque)) {
                this.arrayBloque.push(pregunta.bloque);
            }
        }
    }

    existe(bloque) {
        if (this.arrayBloque == null) {
            return false;
        } else {
            for (let value of this.arrayBloque) {
                if (value == bloque) {
                    return true;
                }
            }
            return false;
        }

    }

    buscarRespondido() {
        for (let alternativa of this.arrayAlternativasEnviar) {
            if (alternativa.id < 0) {
                return false;
            }
        }
        return true;
    }

    resetearData() {
        this.enviarRespuestaEP = {data: {id_perfil_psico: 0, id_estado_perfil: 0, alternativa: []}};
        this.arrayAlternativasEnviar = [];
    }

    enviarRespuestas() {
        this.getArrayEnvio();
        console.log(this.enviarRespuestaEP);
        if (this.buscarRespondido()) {
            this.epPendienteAlumnoService.postEnviarRespuesta(this.enviarRespuestaEP).subscribe(
                (res: RecibirRespuestaEPModel) => {
                    Swal.fire({
                        position: 'center',
                        type: 'success',
                        title: 'Respuestas enviadas correctamente.',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    Swal.fire({
                        position: 'center',
                        type: 'success',
                        title: '¡Resultado Instantáneo!',
                        html:'Usted '+res.descripcion+".",
                        animation: false,
                        confirmButtonText: 'Cerrar',
                    })

                    console.log(res);
                    this.router.navigate(['alumno/evaluaciones-psicologicas-pendientes']);

                },
                error => {
                    Swal.fire({
                        position: 'center',
                        type: 'error',
                        title: 'Error enviar respuestas.',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // this.router.navigate(['alumno/evaluaciones-psicologicas-pendientes']);
                    console.log(error);
                });
        } else {
            Swal.fire({
                position: 'center',
                type: 'warning',
                title: 'Marque todas las preguntas.',
                showConfirmButton: false,
                timer: 1500
            });
        }
        this.resetearData();
        console.log(this.enviarRespuestaEP);
    }

    salir(){
        Swal.fire({
            title: '¿Estás seguro de salir?',
            text: "Todo tu avance será borrado!",
            type: 'warning',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#5867dd',
            cancelButtonColor: '#fd397a',
            confirmButtonText: 'Sí, salir!',
            cancelButtonText:'Cancelar',
        }).then((result) => {
            if (result.value) {
                this.router.navigate(['alumno/evaluaciones-psicologicas-pendientes']);
            }
        })

    }

}

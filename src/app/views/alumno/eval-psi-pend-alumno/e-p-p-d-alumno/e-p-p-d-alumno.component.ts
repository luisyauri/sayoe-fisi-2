import {Component, OnInit} from '@angular/core';
import {EppEpService} from '../../../../services/intercambio/epp-ep.service';
import {EPPendienteAlumnoService} from '../../../../services/alumno/e-p-pendiente-alumno.service';
import {AlternativasGetUnaEPModel, GetUnaEPModel} from '../../../../models/alumno/e-p-pendientes-alumno/getUnaEP.model';
import {
    AlternativasEnviarRespuestaEPModel, EnviarRespuestaEPModel,
} from '../../../../models/alumno/e-p-pendientes-alumno/enviarRespuesaEP.model';
import {Router} from '@angular/router';


@Component({
    selector: 'app-e-p-p-d-alumno',
    templateUrl: './e-p-p-d-alumno.component.html',
    styleUrls: ['./e-p-p-d-alumno.component.css']
})
export class EPPDAlumnoComponent implements OnInit {

    //Variables
    id_perfil_psico: number;
    id_cuest_eval: number;
    ep: GetUnaEPModel;
    arrayBloque =[] ;

    //Alternativass
    arrayAlternativasMarcadasConDeTexto: AlternativasGetUnaEPModel[] = [];
    arrayAlternativasEnviar: AlternativasEnviarRespuestaEPModel[] = [];

    //Enviar respuesta
    enviarRespuestaEP: EnviarRespuestaEPModel = {data: {id_perfil_psico: 0, id_cuest_eval: 0, alternativa: []}};

    //Constructor
    constructor(private eppEpService: EppEpService,
                private epPendienteAlumnoService: EPPendienteAlumnoService,
                private router: Router
    ) {
    }

    ngOnInit() {
        // this.id_cuest_eval = 1;
        this.getIdPerfilYEvaluacion();
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
                    console.log(this.arrayBloque);
                }
                console.log(this.arrayAlternativasMarcadasConDeTexto);
            },
            error1 => {
                console.log('Error al extraer una evaluación psicológica.');
            });
    }

    getIdPerfilYEvaluacion() {
        this.eppEpService.currendId_perfil_psico.subscribe(value => {
            this.id_perfil_psico = value;
        });
        this.eppEpService.currentId_cuest_eval.subscribe(value => {
            this.id_cuest_eval = value;
        });
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
        this.enviarRespuestaEP.data.id_cuest_eval = this.id_cuest_eval;
        this.enviarRespuestaEP.data.alternativa = this.arrayAlternativasEnviar;
    }

    enviarRespuestas() {
        this.getArrayEnvio();
        console.log(this.enviarRespuestaEP);
        this.epPendienteAlumnoService.postEnviarRespuesta(this.enviarRespuestaEP).subscribe(
            value => {
                console.log(value);
            },
            error => {
                console.log(error);
            });
    }

    //ObtenerArreglo
    getArrayBloques(){
        for(let pregunta of this.ep.preguntas){
            if(!this.existe(pregunta.bloque)){
                this.arrayBloque.push(pregunta.bloque);
            }
        }
    }
    existe(bloque){
        if(this.arrayBloque==null){
            return false;
        }else{
            for(let value of this.arrayBloque){
                if(value == bloque){
                    return true;
                }
            }
            return false;
        }

    }


}

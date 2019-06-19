import {Component, OnInit} from '@angular/core';
import {AlumnoService} from '../../../services/alumno/alumno.service';
import {EnviarMesAnhoPendienteModel} from '../../../models/alumno/e-p-pendientes-alumno/enviarMesAnhoPendiente.model';
import {EPPendienteAlumnoService} from '../../../services/alumno/e-p-pendiente-alumno.service';
import {getEPPendientesModel,
} from '../../../models/alumno/e-p-pendientes-alumno/getEPPendientes.model';
import {EppEpService} from '../../../services/intercambio/epp-ep.service';
import {Router} from '@angular/router';
import {parse} from 'ts-node';

@Component({
    selector: 'app-eval-psi-pend-alumno',
    templateUrl: './eval-psi-pend-alumno.component.html',
    styleUrls: ['./eval-psi-pend-alumno.component.css']
})
export class EvalPsiPendAlumnoComponent implements OnInit {

    //Variables
    enviarMesAnho: EnviarMesAnhoPendienteModel = {codigo: '', anho: '', mes: ''};
    date = new Date();
    arrayGetEPPendientes:  getEPPendientesModel[];
    displayedColumns: string[] = ['titulo','preguntas','acciones'];
    banderaContenido= true;
    //dateRecibido: Date;
    dateMostrarFormat: string;

    //Constructor
    constructor(private alumnoService: AlumnoService,
                private epPendienteAlumnoService: EPPendienteAlumnoService,
                private eppEpService:EppEpService,
                private router: Router,
                ) {
    }

    ngOnInit() {
        this.getEnviarMesAnho();
        this.getEPPendientes();
    }

    getEnviarMesAnho() {
        this.enviarMesAnho.codigo = this.alumnoService.getIdAlumno();
        this.enviarMesAnho.anho = this.date.getFullYear().toString();
        this.enviarMesAnho.mes = (this.date.getMonth() + 1).toString();
    }
    getEPPendientes() {
        this.epPendienteAlumnoService.getEnviarMesAnho(this.enviarMesAnho).subscribe(
            (res: getEPPendientesModel) => {
                this.arrayGetEPPendientes = res['data'];
                console.log(this.arrayGetEPPendientes);
                this.getDateFormat();
                if(this.arrayGetEPPendientes.length<1){
                    this.banderaContenido = false;
                }else{
                    this.banderaContenido = true;
                }
            },
            error1 => {
                console.log("Error al extraer la lista de evaluaciones psicológicas.")
            });
    }
    abrirEP(idCuestEval: number, idPerfilPsicologico: number,idEstadoPerfil:number){

        this.eppEpService.setId_cuest_eval(idCuestEval);
        this.eppEpService.setId_perfil_psico(idPerfilPsicologico);
        this.eppEpService.setId_estado_perfil(idEstadoPerfil);
        this.router.navigate(['alumno/evaluacion-psicologica']);
    }
    getDateFormat(){
        for(let i=0;i<this.arrayGetEPPendientes.length;i++){
            const fechaVenci = this.arrayGetEPPendientes[i].fecha_vencimiento
            const dateMostrarFormat = fechaVenci.slice(8,10)+'-'+fechaVenci.slice(5,7)+'-'+fechaVenci.slice(0,4);
            this.arrayGetEPPendientes[i].fecha_vencimiento = dateMostrarFormat;
        }
    }

}

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
                this.getDateFormat()
                console.log(this.arrayGetEPPendientes);
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

        console.log(idCuestEval);
        console.log(idPerfilPsicologico);
        console.log(idEstadoPerfil);
        this.eppEpService.setId_cuest_eval(idCuestEval);
        this.eppEpService.setId_perfil_psico(idPerfilPsicologico);
        this.eppEpService.setId_estado_perfil(idEstadoPerfil);
        this.router.navigate(['alumno/evaluacion-psicologica']);
    }
    getDateFormat(){
        // for(let i=0;i<this.arrayGetEPPendientes.length;i++){
        //     const dateRecibido = new Date(this.arrayGetEPPendientes[i].fecha_vencimiento);
        //     console.log(dateRecibido);
        //     console.log(dateRecibido);
        //     this.dateMostrarFormat = dateRecibido.getDate().toString()+'-'+(dateRecibido.getMonth()+1).toString()+'-'+dateRecibido.getFullYear().toString();
        //     console.log(this.dateMostrarFormat);
        //     this.arrayGetEPPendientes[i].fecha_vencimiento = this.dateMostrarFormat;
        //     console.log(this.arrayGetEPPendientes[i].fecha_vencimiento);
        // }
        // for(let epPendiente of this.arrayGetEPPendientes){
        //     const array = epPendiente.fecha_vencimiento.split('-');
        // }

    }

}



/*
export class EvalPsiPendAlumnoComponent implements OnInit {

    //Variables
    enviarMesAnho: EnviarMesAnhoPendienteModel = {codigo: '', anho: '', mes: ''};
    date = new Date();
    arrayGetEPPendientes:  getEPPendientesModel[];
    displayedColumns: string[] = ['titulo','preguntas','acciones'];

    //Constructor
    constructor(private alumnoService: AlumnoService,
                private epPendienteAlumnoService: EPPendienteAlumnoService,
                public dialog: MatDialog,
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
            },
            error1 => {
                console.log("Error al extraer la lista de evaluaciones psicológicas.")
            });
    }

    abrirEP(id: number){
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.data ={
            id : id.toString(),
        };
        dialogConfig.maxHeight = "100%";
        this.dialog.open(EvalPsiPendDialogAlumnoComponent, dialogConfig);
    }

}

 */

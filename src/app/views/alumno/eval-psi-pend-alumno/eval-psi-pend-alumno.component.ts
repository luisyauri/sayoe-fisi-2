import {Component, OnInit} from '@angular/core';
import {AlumnoService} from '../../../services/alumno/alumno.service';
import {EnviarMesAnhoModel} from '../../../models/alumno/e-p-pendientes-alumno/enviarMesAnho.model';
import {EPPendienteAlumnoService} from '../../../services/alumno/e-p-pendiente-alumno.service';
import {getEPPendientesModel,
} from '../../../models/alumno/e-p-pendientes-alumno/getEPPendientes.model';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {EvalPsiPendDialogAlumnoComponent} from './eval-psi-pend-dialog-alumno/eval-psi-pend-dialog-alumno.component';
import {EppEpService} from '../../../services/intercambio/epp-ep.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-eval-psi-pend-alumno',
    templateUrl: './eval-psi-pend-alumno.component.html',
    styleUrls: ['./eval-psi-pend-alumno.component.css']
})
export class EvalPsiPendAlumnoComponent implements OnInit {

    //Variables
    enviarMesAnho: EnviarMesAnhoModel = {codigo: '', anho: '', mes: ''};
    date = new Date();
    arrayGetEPPendientes:  getEPPendientesModel[];
    displayedColumns: string[] = ['titulo','preguntas','acciones'];

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
            },
            error1 => {
                console.log("Error al extraer la lista de evaluaciones psicológicas.")
            });
    }

    abrirEP(id: number, idPerfilPsicologicos: number){
        this.eppEpService.setId_cuest_eval(id);
        this.eppEpService.setId_perfil_psico(idPerfilPsicologicos);
        this.router.navigate(['alumno/evaluacion-psicologica']);
    }

}



/*
export class EvalPsiPendAlumnoComponent implements OnInit {

    //Variables
    enviarMesAnho: EnviarMesAnhoModel = {codigo: '', anho: '', mes: ''};
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

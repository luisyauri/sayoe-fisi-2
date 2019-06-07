import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {EPPendienteAlumnoService} from '../../../../services/alumno/e-p-pendiente-alumno.service';
import {GetUnaEPModel} from '../../../../models/alumno/e-p-pendientes-alumno/getUnaEP.model';

@Component({
    selector: 'app-eval-psi-pend-dialog-alumno',
    templateUrl: './eval-psi-pend-dialog-alumno.component.html',
    styleUrls: ['./eval-psi-pend-dialog-alumno.component.css']
})
export class EvalPsiPendDialogAlumnoComponent implements OnInit {

    //Variables
    ep: GetUnaEPModel;

    //Constructor
    constructor(public dialogConfig: MatDialogRef<EvalPsiPendDialogAlumnoComponent>,
                @Inject(MAT_DIALOG_DATA) public data,
                private epPendienteAlumnoService: EPPendienteAlumnoService,
    ) {
    }

    ngOnInit() {
        this.getUnEP(this.data.id);
    }

    //Métodos
    getUnEP(id: string) {
        this.epPendienteAlumnoService.getUnaEP(id).subscribe(
            (res: GetUnaEPModel) => {
                this.ep=res['data'][0];
            },
            error1 => {
                console.log("Error al extraer una evaluación psicológica.")
            });
    }
}

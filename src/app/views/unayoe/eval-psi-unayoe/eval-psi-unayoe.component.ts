import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {EvalPsiUnayoeDialogComponent} from './eval-psi-unayoe-dialog/eval-psi-unayoe-dialog.component';
import {EvalPsiUnayoeService} from '../../../services/unayoe/eval-psi-unayoe.service';
import {EvalPsiUnayoeListComponent} from './eval-psi-unayoe-list/eval-psi-unayoe-list.component';
import {EvalPsicoUnayoe} from '../../../models/unayoe/evaluaciones-psicologicas-unayoe/evalPsicoUnayoe.model';
import Swal from 'sweetalert2';

export interface DialogSelected {
    valueSelected: string;
}

@Component({
    selector: 'app-eval-psi-unayoe',
    templateUrl: './eval-psi-unayoe.component.html',
    styleUrls: ['./eval-psi-unayoe.component.css']
})
export class EvalPsiUnayoeComponent implements OnInit {

    // Variables
    datos: EvalPsicoUnayoe;
    banderaSpinner = true;
    displayedColumns: string[] = ['titulo', 'autor', 'preguntas', 'detalles'];
    selected = '';


    // Constructor
    constructor(public dialog: MatDialog, private  evalPsiUnayoeService: EvalPsiUnayoeService) {
    }

    ngOnInit() {
        this.getEvaluacionesPsicologicas();

    }

    // Metodos
    getEvaluacionesPsicologicas() {
        this.evalPsiUnayoeService.getEvaluacionesPsicologicas().subscribe(
            (res: EvalPsicoUnayoe) => {
                this.datos = res['data'];
                this.banderaSpinner = false;
            },
            error => {
                console.log(<any> error);
            }
        );
    }

    openDialog() {
        if (this.selected == '1') {

        } else if (this.selected == '2') {
            const dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = true;
            // dialogConfig.width = '50%';
            dialogConfig.data = {
                dataEvalPsi: this.datos,
            };
            dialogConfig.maxHeight = '100%';
            this.dialog.open(EvalPsiUnayoeDialogComponent, dialogConfig);
        } else {
            Swal.fire({
                position: 'center',
                type: 'warning',
                title: 'Seleccione un Grupo o Alumno.',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    openDialogList(id) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.width = '70%';
        dialogConfig.height = '90%';
        dialogConfig.data = {
            titulo: this.datos[id - 1].titulo,
            preguntas: this.datos[id - 1].preguntas,
        };
        this.dialog.open(EvalPsiUnayoeListComponent, dialogConfig);
    }
}



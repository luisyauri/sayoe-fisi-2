import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import {
    AlumnosAsignarAlumnoUnayoe, AsignarAlumnoUnayoe,
    TestAsignarAlumnoUnayoe
} from '../../../../models/unayoe/evaluaciones-psicologicas-unayoe/asignarAlumnoUnayoe.model';

import {DatosUnAlumnoUnayoe} from '../../../../models/unayoe/evaluaciones-psicologicas-unayoe/datosUnAlumnoUnayoe.model';
import {EvalPsiUnayoeService} from '../../../../services/unayoe/eval-psi-unayoe.service';
import {EvalPsicoUnayoe, SendDatosDialogUnayoe} from '../../../../models/unayoe/evaluaciones-psicologicas-unayoe/evalPsicoUnayoe.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {EvalPsiUnayoeListComponent} from '../eval-psi-unayoe-list/eval-psi-unayoe-list.component';
import {forEach} from '@angular/router/src/utils/collection';

export interface Fruit {
    name: string;
}

@Component({
    selector: 'app-eval-psi-unayoe-dialog',
    templateUrl: './eval-psi-unayoe-dialog.component.html',
    styleUrls: ['./eval-psi-unayoe-dialog.component.css']
})
export class EvalPsiUnayoeDialogComponent implements OnInit {

    // Variables
    datosUnAlumno: DatosUnAlumnoUnayoe;
    asignarAlumno: AsignarAlumnoUnayoe = {alumnos:[],test:[],fecha_limite:''};
    allTest: EvalPsicoUnayoe;
    selecionarFecha: string;

    readonly separatorKeysCodes: number[] = [ENTER, COMMA];

    //Alumnos
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    alumnos: AlumnosAsignarAlumnoUnayoe[] = [];

    //Evaluaciones
    selectableTest = true;
    removableTest = true;
    addOnBlurTest = true;
    tests: TestAsignarAlumnoUnayoe[] = [];

    // Constructor
    constructor(private evalPsiUnayoeService: EvalPsiUnayoeService,
                public dialogConfig: MatDialogRef<EvalPsiUnayoeDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public dataMain: SendDatosDialogUnayoe,
                ) {
    }

    ngOnInit() {
        this.getCargarTest();
    }

    // Metodos
    // Chips Alumnos
    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        if (value == '' || value == null) {
            console.log('NO ENTRO');
        } else {
            this.evalPsiUnayoeService.getDatosUnEstudiante(value).subscribe(
                (res: DatosUnAlumnoUnayoe) => {
                    this.datosUnAlumno = res['data'];
                    this.alumnos.push({codigo: this.datosUnAlumno.codigo});
                },
                error => {
                    console.log('CÓDIGO INVÁLIDO');
                    console.log(<any> error);
                }
            );
        }
        // Reset the input value
        if (input) {
            input.value = '';
        }
    }
    remove(alumno: AlumnosAsignarAlumnoUnayoe): void {
        const index = this.alumnos.indexOf(alumno);
        if (index >= 0) {
            this.alumnos.splice(index, 1);
        }
    }

    getCargarTest(){
        this.allTest = this.dataMain.dataEvalPsi;
    }
    //Chips Evaluaciones Psicológicas
    addTest(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        if (value == '' || value == null) {
            console.log('NO ENTRO');
        } else {
            this.evalPsiUnayoeService.getUnaEvaluacionPsicologica(value).subscribe(
                (res: EvalPsicoUnayoe) => {
                    this.allTest = res['data'][0];
                    this.tests.push({id: this.allTest.id});
                },
                error => {
                    console.log('ID INVÁLIDO');
                    console.log(<any> error);
                }
            );
        }
        // Reset the input value
        if (input) {
            input.value = '';
        }
    }
    removeTest(test: TestAsignarAlumnoUnayoe): void {
        const index = this.tests.indexOf(test);
        if (index >= 0) {
            this.tests.splice(index, 1);
        }
    }

    //Asignar
    sendAsignar(){
        console.log("ENTRANDO");
        this.asignarAlumno.alumnos = this.alumnos;
        this.asignarAlumno.test = this.tests;
        this.asignarAlumno.fecha_limite = this.selecionarFecha;
        console.log("TESTEANDO");
        this.evalPsiUnayoeService.getAsignar(this.asignarAlumno).subscribe();
        console.log("ENVIADO");
    }
}

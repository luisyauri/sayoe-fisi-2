import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';

import {
    AlumnosAsignarAlumnoUnayoe, AsignarAlumnoUnayoe,
    TestAsignarAlumnoUnayoe
} from '../../../../models/unayoe/evaluaciones-psicologicas-unayoe/asignarAlumnoUnayoe.model';

import {DatosUnAlumnoUnayoe} from '../../../../models/unayoe/evaluaciones-psicologicas-unayoe/datosUnAlumnoUnayoe.model';
import {EvalPsiUnayoeService} from '../../../../services/unayoe/eval-psi-unayoe.service';
import {EvalPsicoUnayoe, SendDatosDialogUnayoe} from '../../../../models/unayoe/evaluaciones-psicologicas-unayoe/evalPsicoUnayoe.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import Swal from 'sweetalert2';

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
    asignarAlumno: AsignarAlumnoUnayoe = {alumnos: [], test: [], fecha_limite: ''};
    allTest: EvalPsicoUnayoe;
    selecionarFecha: string;
    banderaCodigoRepetido = false;
    banderaEPRepetido = false;
    // Banderas
    banderaTest=false;

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
                    for (let alumno of this.alumnos) {
                        if (alumno.codigo == this.datosUnAlumno.codigo) {
                            this.banderaCodigoRepetido = true;
                        }
                    }
                    if (this.banderaCodigoRepetido) {
                        Swal.fire({
                            position: 'center',
                            type: 'warning',
                            title: 'Código Repetido.',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        this.banderaCodigoRepetido = false;
                    } else {
                        this.alumnos.push({codigo: this.datosUnAlumno.codigo});
                    }

                },
                error => {
                    Swal.fire({
                        position: 'center',
                        type: 'error',
                        title: 'Código Inválido.',
                        showConfirmButton: false,
                        timer: 1500
                    });
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
        this.datosUnAlumno = {nombre: '', codigo: '', escuela: '', situacion: ''};
        if (index >= 0) {
            this.alumnos.splice(index, 1);
        }
    }

    getCargarTest() {
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
                    console.log('ID ENTRA');
                    this.allTest = res['data'][0];
                    if(this.allTest != null){
                        for (let test of this.tests) {
                            if (test.id == this.allTest.id) {
                                this.banderaEPRepetido = true;
                            }
                        }
                        if(this.banderaEPRepetido){
                            Swal.fire({
                                position: 'center',
                                type: 'warning',
                                title: 'Evaluación Psicológica Repetida.',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            this.banderaEPRepetido = false;
                        }else{
                            this.tests.push({id: this.allTest.id});
                            this.banderaTest = true;
                        }
                    }else{
                        Swal.fire({
                            position: 'center',
                            type: 'error',
                            title: 'Evaluación Psicológica Inválida.',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }

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
        if(index==0){
            this.banderaTest=false;
        }
    }

    //Asignar
    sendAsignar() {

        if(this.alumnos != null && this.banderaTest==true && this.selecionarFecha != null){
            this.asignarAlumno.alumnos = this.alumnos;
            this.asignarAlumno.test = this.tests;
            this.asignarAlumno.fecha_limite = this.selecionarFecha;
            this.evalPsiUnayoeService.getAsignar(this.asignarAlumno).subscribe(
                value => {
                    Swal.fire({
                        position: 'center',
                        type: 'success',
                        title: 'Registrado satisfactoriamente',
                        showConfirmButton: false,
                        timer: 1500
                    });
                },
                error => {
                    Swal.fire({
                        position: 'center',
                        type: 'error',
                        title: 'Error al registrar.',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    console.log(<any> error);
                });
            this.dialogConfig.close();
        }else{
            Swal.fire({
                position: 'center',
                type: 'warning',
                title: 'Complete todo los campos.',
                showConfirmButton: false,
                timer: 1500
            });
        }

    }

    close() {
        this.dialogConfig.close();
    }

}

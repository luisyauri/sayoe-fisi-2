import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';

import {
    AlumnosAsignarAlumnoUnayoe, AsignarAlumnoUnayoe,
    EPAsignarAlumnoUnayoe
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

    readonly separatorKeysCodes: number[] = [ENTER, COMMA];

    // Variables
    asignarAlumno: AsignarAlumnoUnayoe = {alumnos: [], test: [], dia:'', mes:'', anho:''};

    // Banderas
    banderaCodigoRepetido = false;
    banderaMostrar=false;

    //Fecha
    fecha: Date;
    dia='';
    mes='';
    anho='';

    //Alumnos
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    alumnos: AlumnosAsignarAlumnoUnayoe[] = [];
    datosUnAlumno: DatosUnAlumnoUnayoe;

    //Situación
    situacion = '';
    colorSituacion= false;

    //Evaluaciones Psicológicoas
    allEP: EvalPsicoUnayoe;
    arrayEPSelected=[];
    eps: EPAsignarAlumnoUnayoe[] = [];

    //Constructor
    constructor(private evalPsiUnayoeService: EvalPsiUnayoeService,
                public dialogConfig: MatDialogRef<EvalPsiUnayoeDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public dataMain: SendDatosDialogUnayoe,
    ) {
    }

    ngOnInit() {
        this.getCargarTest();
    }

    //Metodos
    getCargarTest() {
        this.allEP = this.dataMain.dataEvalPsi;
    }
    getInsertArrayToEPS(arrayEPSelected: string[]){
        for(let valorId of arrayEPSelected){
            this.eps.push({id: Number(valorId)});
        }
    }
    getObjectAsignarAlumno(alumnos: AlumnosAsignarAlumnoUnayoe[],eps: EPAsignarAlumnoUnayoe[],dia:string,mes:string,anho:string){
        this.asignarAlumno.alumnos = alumnos;
        this.asignarAlumno.test = eps;
        this.asignarAlumno.dia = dia;
        this.asignarAlumno.mes = mes;
        this.asignarAlumno.anho = anho;
    }

    //Chips Alumnos
    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;
        if (value == '' || value == null) {
            // console.log('NO ENTRO');
        } else {
            this.evalPsiUnayoeService.getDatosUnEstudiante(value).subscribe(
                (res: DatosUnAlumnoUnayoe) => {
                    // console.log("FUNCIONO");
                    this.datosUnAlumno = res['data'];
                    this.calculateSituacion(this.datosUnAlumno.situacion);
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
                        this.banderaMostrar=true;
                    }

                },
                error => {
                    console.log("NO FUNCIONO");
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
        this.situacion = '';
        this.banderaMostrar=false;
    }

    //Asignar
    sendAsignar() {
        this.getInsertArrayToEPS(this.arrayEPSelected);
        this.getObjectAsignarAlumno(this.alumnos,this.eps,this.dia,this.mes,this.anho);
        // Validamos para que se envie solo cuando los 3 campos tengan por lo menos una letra.
        if(this.anho.length==4 && this.arrayEPSelected.length>0 && this.alumnos.length>0){
            this.evalPsiUnayoeService.getAsignar(this.asignarAlumno).subscribe(
                value => {
                    Swal.fire({
                        position: 'center',
                        type: 'success',
                        title: 'Registrado correctamente.',
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
    //Fecha
    actualizarFecha(newDate) {
        this.fecha = newDate;
        this.dia = this.fecha.getDate().toString();
        this.mes = (this.fecha.getMonth()+1).toString();
        this.anho = this.fecha.getFullYear().toString();
    }

    calculateSituacion(situacion: any){
        if (situacion == 'O') {
            this.situacion = 'Observado';
            this.colorSituacion = true;
        }
        else{
            this.situacion = '';
            this.colorSituacion = false;
        }
    }
}

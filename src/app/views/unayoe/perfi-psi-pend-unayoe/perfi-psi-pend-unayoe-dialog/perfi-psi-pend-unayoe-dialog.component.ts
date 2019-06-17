import {Component, Inject, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {SendDatosDialogUnayoe} from '../../../../models/unayoe/evaluaciones-psicologicas-unayoe/evalPsicoUnayoe.model';
import {PerfPendPsiUnayoeService} from '../../../../services/unayoe/perf-pend-psi-unayoe.service';
import {
    BECKEPPModel,
    IHEDADEPPModel,
    IHEDEPPModel,
    IHEEPPModel,
    PPModel
} from '../../../../models/unayoe/perfi-psi-pend-unayoe/perfilPsicologico.model';
import {fakeAsync} from '@angular/core/testing';
import {SendRecomPPUnayoeModel} from '../../../../models/unayoe/perfi-psi-pend-unayoe/sendRecomPPUnayoe.model';

@Component({
    selector: 'app-perfi-psi-pend-unayoe-dialog',
    templateUrl: './perfi-psi-pend-unayoe-dialog.component.html',
    styleUrls: ['./perfi-psi-pend-unayoe-dialog.component.css']
})
export class PerfiPsiPendUnayoeDialogComponent implements OnInit {

    //Variables
    perfilPsicologico: PPModel;
    evaluacionBeck: BECKEPPModel;
    evaluacionIHE: IHEEPPModel;
    //banderaCuestionarios
    banderaIHE = false;
    banderaBeck = false;

    // arrayTest = [3,2,4,5,1,0];
    arrayIHE = [0, 2, 4, 6, 8, 10];
    //Variables Chart Inventario de Habitos de Estudio.
    titleIHE = 'Inventario de Habitos de Estudio';
    typeIHE = 'ComboChart';
    columnNamesIHE = ['Área', 'Puntaje', {type: 'string', role: 'tooltip'}, 'Total', {type: 'string', role: 'tooltip'}];
    optionsIHE = {
        legend: {position: 'none'},
        chartArea: {width: '50%', height: '70%'},
        vAxis: {
            title: 'Categorías',
            ticks: [
                {v: 0, f: 'Muy negativo'}, {v: 2, f: 'Negativo'},
                {v: 4, f: 'Tendencia (-)'}, {v: 6, f: 'Tendencia (+)'},
                {v: 8, f: 'Positivo'}, {v: 10, f: 'Muy positivo'},
            ]
        },
        hAxis: {title: 'Áreas'},
        seriesType: 'bars',
        series: {1: {type: 'line'}},
        focusTarget: 'category',
        title: '',
    };
    widthIHE = 700;
    heightIHE = 400;

    dataIHE = [];
    // Fin Chart Inventario de Habitos de Estudio
    // recomendacion = '';
    dataRecomendacion: SendRecomPPUnayoeModel = {data:{id_perfil_psico: -1,recomendacion:''}};


    constructor(public dialogConfig: MatDialogRef<PerfiPsiPendUnayoeDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data,
                private perfPendPsiUnayoeService: PerfPendPsiUnayoeService) {
    }

    ngOnInit() {
        this.getDataDialogPerPisco();
    }

    getDataDialogPerPisco() {
        this.perfPendPsiUnayoeService.getDataDialogPendPisco(this.data.id_perfil_psico.toString()).subscribe(
            (res: PPModel) => {
                this.perfilPsicologico = res['data'];
                this.obtenerDatosCadaEP();
                console.log(this.perfilPsicologico);
            }, error1 => {
                error1;
            }
        );
    }

    obtenerDatosCadaEP() {
        for (let evaluaciones of this.perfilPsicologico.evaluaciones) {
            if (evaluaciones.id_cuest_eval == 1) {
                this.banderaIHE = true;
                // @ts-ignore
                this.evaluacionIHE = evaluaciones;
                this.generateArrayAndGraficoIHE();
                console.log(this.evaluacionIHE.descripcion);
            }
            if (evaluaciones.id_cuest_eval == 2) {
                this.banderaBeck = true;
                // console.log(evaluaciones);
                // @ts-ignore
                this.evaluacionBeck = evaluaciones;

            }
        }
    }

    generateArrayAndGraficoIHE() {
        let i = 1;
        for (let area of this.evaluacionIHE.descripcion) {
            // console.log(area.valor);
            // console.log(area.descripcion.id);
            for (let valueIHE of this.arrayIHE) {
                if (area.descripcion.id == valueIHE / 2) {
                    if (i != this.evaluacionIHE.descripcion.length) {
                        this.dataIHE.push(['Área ' + this.romanize(i), valueIHE, area.valor, valueIHE, area.valor],);
                    } else {
                        this.dataIHE.push(['Total', valueIHE, area.valor, valueIHE, area.valor],);
                    }
                    i++;
                }
            }

        }
        i = 0;
    }

    // startChartIHE(,){
    //     let i = 1;
    //     for(let valueTest of this.arrayTest){
    //         for(let valueIHE of this.arrayIHE){
    //             if(valueTest == valueIHE/2){
    //                 if(i!=this.arrayTest.length){
    //                     this.dataIHE.push(['Área '+ this.romanize(i), valueIHE,'10',valueIHE,'10'],);
    //                 }else{
    //                     this.dataIHE.push(['Total', valueIHE,'10',valueIHE,'10'],);
    //                 }
    //                 i++;
    //             }
    //         }
    //     }
    // }

    romanize(num) {
        if (isNaN(num)) {
            return NaN;
        }
        var digits = String(+num).split(''),
            key = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM',
                '', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC',
                '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
            roman = '',
            i = 3;
        while (i--) {
            roman = (key[+digits.pop() + (i * 10)] || '') + roman;
        }
        return Array(+digits.join('') + 1).join('M') + roman;
    }


    close() {
        Swal.fire({
            title: '¿Estás seguro de salir?',
            type: 'warning',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#5867dd',
            cancelButtonColor: '#fd397a',
            confirmButtonText: 'Sí, salir!',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.value) {
                this.dialogConfig.close();
            }
        });
    }

    devolverTitulo(descripcion: IHEDADEPPModel) {
        let titulo;
        if (descripcion.id == 0) {
            titulo = descripcion.titulo;
        } else if (descripcion.id == 1) {
            titulo = descripcion.titulo;
        } else if (descripcion.id == 2) {
            titulo = descripcion.titulo;
        } else if (descripcion.id == 3) {
            titulo = descripcion.titulo;
        } else if (descripcion.id == 4) {
            titulo = descripcion.titulo;
        } else if (descripcion.id == 5) {
            titulo = descripcion.titulo;
        } else {
            titulo = 'FAKE';
        }
        return titulo;
    }

    devolverContenido(descripcion: IHEDADEPPModel) {
        let content;
        if (descripcion.id == 0) {
            content = descripcion.contenido;
        } else if (descripcion.id == 1) {
            content = descripcion.contenido;
        } else if (descripcion.id == 2) {
            content = descripcion.contenido;
        } else if (descripcion.id == 3) {
            content = descripcion.contenido;
        } else if (descripcion.id == 4) {
            content = descripcion.contenido;
        } else if (descripcion.id == 5) {
            content = descripcion.contenido;
        } else {
            content = 'FAKE';
        }
        return content;
    }

    devolverSexo(sexo: number) {
        let sSexo;
        if (sexo == 0) {
            sSexo = 'Hombre';
        } else if (sexo == 1) {
            sSexo = 'Mujer';
        } else {
            sSexo = 'No definido';
        }
        return sSexo;
    }

    devolverSituacion(situacion: string) {
        let sSituacion;
        if (situacion == 'R') {
            sSituacion = 'Regular';
        } else if (situacion == 'O') {
            sSituacion = 'Observador';
        } else {
            sSituacion = 'No definido';
        }
        return sSituacion;
    }

    obtenerTituloArea(indice: number) {
        let nombreArea;
        if (indice == 1) {
            nombreArea = '¿Cómo estudia usted?';
        } else if (indice == 2) {
            nombreArea = '¿Cómo hace usted sus tareas?';
        } else if (indice == 3) {
            nombreArea = '¿Cómo prepara usted sus exámenes?';
        } else if (indice == 4) {
            nombreArea = '¿Cómo escucha usted sus clases?';
        } else if (indice == 5) {
            nombreArea = '¿Qué acompaña sus momentos de estudio?';
        } else {
            nombreArea = '';
        }
        return nombreArea;
    }

    enviarRecomendacion(id_perfil_psico: string) {
        if(this.data.bandera == 0){
            if (this.perfilPsicologico.recomendacion.length != 0) {
                Swal.fire({
                    title: '¿Estás seguro de enviar la recomendación?',
                    type: 'warning',
                    showCancelButton: true,
                    showConfirmButton: true,
                    confirmButtonColor: '#5867dd',
                    cancelButtonColor: '#fd397a',
                    confirmButtonText: 'Sí, Enviar!',
                    cancelButtonText: 'Cancelar',
                }).then((result) => {
                    if (result.value) {
                        this.dataRecomendacion.data.recomendacion = this.perfilPsicologico.recomendacion;
                        this.dataRecomendacion.data.id_perfil_psico = Number(id_perfil_psico);
                        this.perfPendPsiUnayoeService.sendRecomendacionDialogPendPisco(this.dataRecomendacion).subscribe(
                            res => {
                                Swal.fire({
                                    position: 'center',
                                    type: 'success',
                                    title: 'Recomendación registrada correctamente.',
                                    showConfirmButton: false,
                                    confirmButtonColor: '#5867dd',
                                    timer: 1500
                                });
                                console.log(res);
                            }, error => {
                                Swal.fire({
                                    position: 'center',
                                    type: 'error',
                                    title: 'Error al enviar recomendación.',
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            }
                        );
                        this.dialogConfig.close();
                    }
                });
            } else {
                Swal.fire({
                    position: 'center',
                    type: 'warning',
                    title: 'Complete el campo recomendación.',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }

    }

}

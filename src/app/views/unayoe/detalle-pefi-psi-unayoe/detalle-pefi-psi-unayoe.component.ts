import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {SenDataDetallePPUnayoe} from '../../../models/unayoe/detalle-perf-psi-unayoe/senDataDetallePPUnayoe';
import {
    BECKDDPPUnayoeModel, DescriIHEDPPUnayoeModel, DesDescriIHEDPPUnayoeModel,
    DetallePPUnayoeModel,
    IHEDPPUnayoeModel
} from '../../../models/unayoe/detalle-perf-psi-unayoe/detallePPUnayoe.model';
import {DetallePerfPsiUnayoeService} from '../../../services/unayoe/detalle-perf-psi-unayoe.service';
import Swal from "sweetalert2";
import {SendRecomPPUnayoeModel} from '../../../models/unayoe/perfi-psi-pend-unayoe/sendRecomPPUnayoe.model';
import {
    DataSendRecomDetallePPUnayoeModel,
    SendRecomDetallePPUnayoeModel
} from '../../../models/unayoe/detalle-perf-psi-unayoe/sendRecomDetallePPUnayoe.model';

@Component({
    selector: 'app-detalle-pefi-psi-unayoe',
    templateUrl: './detalle-pefi-psi-unayoe.component.html',
    styleUrls: ['./detalle-pefi-psi-unayoe.component.css']
})
export class DetallePefiPsiUnayoeComponent implements OnInit {

    //Variables
    detallePerfilPsicologico: DetallePPUnayoeModel;
    recomendacion= '';
    dataRecomendacion: SendRecomDetallePPUnayoeModel = {data:{id_perfil_psico: -1,recomendacion:''}};
    //Evaluaciones
    evaluacionBeck: BECKDDPPUnayoeModel;
    evaluacionIHE: IHEDPPUnayoeModel;
    //BanderaVistaEvaluación
    banderaBeck = false;
    banderaIHE = false;

    //BanderaDescripciónEvaluación
    banderaDescripcionBanderaBeck = false;
    banderaDescripcionBanderaIHE = false;

    //Variables Chart Inventario de Habitos de Estudio.
    arrayIHE = [0, 2, 4, 6, 8, 10];
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

    constructor(public dialogConfig: MatDialogRef<DetallePefiPsiUnayoeComponent>,
                @Inject(MAT_DIALOG_DATA) public data : SenDataDetallePPUnayoe,
                private detallePerfPsiUnayoeService:DetallePerfPsiUnayoeService,
    ) {
    }

    ngOnInit() {
        this.getDetalleDataPerfilPsicologico();
        // console.log(this.data.id_perfil_psico);
    }
    getDetalleDataPerfilPsicologico(){
        this.detallePerfPsiUnayoeService.getDetallePerfilPsicologico(this.data.id_perfil_psico).subscribe(
            res => {
                // console.log(res);
                this.detallePerfilPsicologico = res['data'];
                console.log(this.detallePerfilPsicologico);
                this.obtenerDatosCadaEP();
            },
            error => {
                console.log(error);
            },
        );
    }
    obtenerDatosCadaEP(){
        for (let evaluaciones of this.detallePerfilPsicologico.evaluaciones) {
            if (evaluaciones.id_cuest_eval == 1) {
                this.banderaIHE = true;
                // @ts-ignore
                this.evaluacionIHE = evaluaciones;
                // @ts-ignore
                if(this.evaluacionIHE.descripcion == 'NO REALIZÓ'){
                    this.banderaDescripcionBanderaIHE = false;
                }else{
                    this.banderaDescripcionBanderaIHE = true;
                    if(this.evaluacionIHE.estado == 1){
                        this.generateArrayAndGraficoIHE();
                    }
                }

                // this.generateArrayAndGraficoIHE();
                // // console.log(this.evaluacionIHE.descripcion);
            }
            if (evaluaciones.id_cuest_eval == 2) {
                this.banderaBeck = true;
                // @ts-ignore
                this.evaluacionBeck = evaluaciones;
                // @ts-ignore
                if(this.evaluacionBeck.descripcion == 'NO REALIZÓ'){
                    this.banderaDescripcionBanderaBeck = false;
                }else{
                    this.banderaDescripcionBanderaBeck = true;
                }
            }
        }
    }

    generateArrayAndGraficoIHE() {
        let i = 1;
        console.log(this.evaluacionIHE.descripcion);
        for (let area of this.evaluacionIHE.descripcion) {
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
    devolverSexo(sexo: string) {
        let sSexo;
        if (sexo == 'M') {
            sSexo = 'MASCULINO';
        } else if (sexo == 'F') {
            sSexo = 'FEMENINO';
        } else {
            sSexo = 'NO DEFINIDO';
        }
        return sSexo;
    }
    devolverSituacion(situacion: string) {
        let sSituacion;
        if (situacion == 'R') {
            sSituacion = 'REGULAR';
        } else if (situacion == 'O') {
            sSituacion = 'OBSERVADO';
        } else {
            sSituacion = 'NO DEFINIDO';
        }
        return sSituacion;
    }
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
    devolverTitulo(descripcion: DesDescriIHEDPPUnayoeModel) {
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
    devolverContenido(descripcion: DesDescriIHEDPPUnayoeModel) {
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

    enviarRecomendacion(id_perfil_psico: number) {
        if(this.data.bandera == 1){
            if (this.recomendacion.length != 0) {
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
                        this.dataRecomendacion.data.recomendacion = this.recomendacion;
                        this.dataRecomendacion.data.id_perfil_psico = id_perfil_psico;
                        console.log(this.dataRecomendacion);
                        this.detallePerfPsiUnayoeService.sendRecomendacionDialogPendPisco(this.dataRecomendacion).subscribe(
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

import {Component, Inject, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CitasUnayoeService} from '../../../../services/unayoe/citas-unayoe.service';
import {CambiarEstadoModel} from '../../../../models/unayoe/citas-unayoe/cambiarEstado.model';
import {SendDatosDialogUnayoe} from '../../../../models/unayoe/evaluaciones-psicologicas-unayoe/evalPsicoUnayoe.model';

@Component({
    selector: 'app-estado-unayoe-dialog',
    templateUrl: './estado-unayoe-dialog.component.html',
    styleUrls: ['./estado-unayoe-dialog.component.css']
})
export class EstadoUnayoeDialogComponent implements OnInit {

    enviarCambiarEstado: CambiarEstadoModel = {data: {estado: '', id_cita: ''}};
    estadoSeleccionado = '';

    constructor(public dialogConfig: MatDialogRef<EstadoUnayoeDialogComponent>,
                private citasUnayoeService: CitasUnayoeService,
                @Inject(MAT_DIALOG_DATA) public dataMain,
    ) {
    }

    ngOnInit() {
    }

    formarEnviarEstado(){
        this.enviarCambiarEstado.data.estado = this.estadoSeleccionado;
        this.enviarCambiarEstado.data.id_cita=this.dataMain.id;
    }

    cambiarEstado() {
        this.formarEnviarEstado();
        console.log(this.enviarCambiarEstado);
        this.citasUnayoeService.camEstado(this.enviarCambiarEstado).subscribe(
            value => {
                Swal.fire({
                    position: 'center',
                    type: 'success',
                    title: 'Cambio registrado correctamente.',
                    showConfirmButton: false,
                    confirmButtonColor: '#5867dd',
                    timer: 1500
                });
                this.dialogConfig.close();
            }, error2 => {

            });
    }

    close() {
        Swal.fire({
            title: '¿Estás seguro de salir?',
            text: 'Todo tu avance será borrado!',
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
}




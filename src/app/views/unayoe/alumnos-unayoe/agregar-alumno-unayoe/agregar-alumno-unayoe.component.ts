import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {EnviarAlumnoUnayoeModel} from '../../../../models/unayoe/alumnos-unayoe/enviarAlumnoUnayoe.model';
import Swal from 'sweetalert2';
import {AlumnosUnayoeService} from '../../../../services/unayoe/alumnos-unayoe.service';
import {DataErroresAlumnoUnayoeModel, ErroresAlumnoUnayoeModel} from '../../../../models/unayoe/alumnos-unayoe/erroresAlumnoUnayoe.model';

@Component({
    selector: 'app-agregar-alumno-unayoe',
    templateUrl: './agregar-alumno-unayoe.component.html',
    styleUrls: ['./agregar-alumno-unayoe.component.css']
})
export class AgregarAlumnoUnayoeComponent implements OnInit {

    //Variables
    dataEnviar: EnviarAlumnoUnayoeModel = {
        data: {
            dni: '', nombre: '', apellido_paterno: '',
            apellido_materno: '', sexo: '', fecha_nacimiento: '', correo: '', contrasenha: '', codigo: '',
            situacion: '', anho_ingreso: '', estado_permanencia: '', id_escuela: ''
        }
    };
    fecha: Date;
    hide = true;
    errores: DataErroresAlumnoUnayoeModel = {correo:[''],dni:[''],codigo:['']};

    //Constructor
    constructor(public dialogConfig: MatDialogRef<AgregarAlumnoUnayoeComponent>,
                private alumnosUnayoeService: AlumnosUnayoeService) {
    }

    ngOnInit() {
    }

    //Métodos
    //Fecha
    actualizarFecha(newDate) {
        let fecha = newDate;
        let dia = fecha.getDate().toString();
        let mes = (fecha.getMonth() + 1).toString();
        let anho = fecha.getFullYear().toString();
        this.dataEnviar.data.fecha_nacimiento = anho + '-' + mes + '-' + dia;
        console.log(this.dataEnviar.data.fecha_nacimiento);
    }

    agregarAlumno() {
        if (this.dataEnviar.data.dni != '' && this.dataEnviar.data.nombre != '' && this.dataEnviar.data.apellido_paterno != '' &&
            this.dataEnviar.data.apellido_materno != '' && this.dataEnviar.data.sexo != '' && this.dataEnviar.data.fecha_nacimiento != '' &&
            this.dataEnviar.data.correo != '' && this.dataEnviar.data.contrasenha != '' && this.dataEnviar.data.codigo != '' &&
            this.dataEnviar.data.situacion != '' && this.dataEnviar.data.anho_ingreso != '' && this.dataEnviar.data.estado_permanencia != '' &&
            this.dataEnviar.data.id_escuela != '') {
            this.alumnosUnayoeService.agregarUnAlumno(this.dataEnviar).subscribe(
                res => {
                    console.log(res);
                    // if(res == 'Ok'){
                    //
                    // }else{
                    //     this.errores = res['errors'];
                    //     Swal.fire({
                    //         position: 'center',
                    //         type: 'warning',
                    //         title: 'El dato ya existe.',
                    //         showConfirmButton: false,
                    //         timer: 1500
                    //     });
                    //     // console.log(this.errores);
                    //     // console.log(this.errores.codigo[0]);
                    //     // console.log(this.errores.correo[0]);
                    //     // console.log(this.errores.dni[0]);
                    // }

                    Swal.fire({
                        position: 'center',
                        type: 'success',
                        title: 'Alumno agregado correctamente.',
                        showConfirmButton: false,
                        confirmButtonColor: '#5867dd',
                        timer: 1500
                    });
                    this.dialogConfig.close();
                },
                error => {
                    Swal.fire({
                        position: 'center',
                        type: 'error',
                        title: 'Error al agregar alumno.',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    console.log(error);
                });
        } else {
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

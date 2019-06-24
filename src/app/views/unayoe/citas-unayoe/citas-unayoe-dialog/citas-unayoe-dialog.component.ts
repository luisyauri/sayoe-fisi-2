import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {CitasUnayoeService} from '../../../../services/unayoe/citas-unayoe.service';
import {AsignarCita} from '../../../../models/unayoe/citas-unayoe/asignarCita';
import {UnayoeService} from '../../../../services/unayoe/unayoe.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-citas-unayoe-dialog',
  templateUrl: './citas-unayoe-dialog.component.html',
  styleUrls: ['./citas-unayoe-dialog.component.css']
})
export class CitasUnayoeDialogComponent implements OnInit {

  fecha: Date;
  fechaEnviar = '';
  horaEnviar = '';
  asignarCita: AsignarCita={data: {codigo:'',asunto:'',fecha_hora:'',descripcion:'',id_unayoe_perfil:-1}}

  constructor(public dialogConfig: MatDialogRef<CitasUnayoeDialogComponent>,
              private citasUnayoeService:CitasUnayoeService,
              private unayoeService:UnayoeService,
              ) { }

  ngOnInit() {
  }

  actualizarFecha(newDate) {
    let fecha = newDate;
    let dia = fecha.getDate().toString();
    let mes = (fecha.getMonth() + 1).toString();
    let anho = fecha.getFullYear().toString();
    this.fechaEnviar= anho + '-' + mes + '-' + dia;
    console.log(this.fechaEnviar);
  }

  formatAsignarCita(){
    this.asignarCita.data.fecha_hora = this.fechaEnviar+' '+this.horaEnviar+':00';
    this.asignarCita.data.id_unayoe_perfil = this.unayoeService.getIdUnayoe();
  }

  asigCitar(){
    this.formatAsignarCita();
    if(this.asignarCita.data.codigo.length>0 && this.asignarCita.data.asunto.length>0 &&
       this.asignarCita.data.fecha_hora.length>0 && this.asignarCita.data.descripcion.length>0
    ){
      console.log(this.asignarCita);
      this.citasUnayoeService.asignarCita(this.asignarCita).subscribe(
          res => {
            console.log(res);
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Cita agregado correctamente.',
              showConfirmButton: false,
              confirmButtonColor: '#5867dd',
              timer: 1500
            });
            this.dialogConfig.close();
          },
          error => {
            console.log(error);
          }
      );
    }else{
      Swal.fire({
        position: 'center',
        type: 'warning',
        title: 'Complete todos los campos.',
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

import {Component, OnInit} from '@angular/core';
import {DatosMiPerfilUnayoe} from '../../../models/unayoe/mi-perfil-unayoe/miPerfilUnayoe.model';
import {DatosActualizarUnayoe} from '../../../models/unayoe/mi-perfil-unayoe/datosActualizarUnayoe.model';
import {Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material';
import {MiPerfilDialogComponent} from './mi-perfil-dialog/mi-perfil-dialog.component';
import {MiPerfilUnayoeService} from '../../../services/unayoe/mi-perfil-unayoe.service';
import {UnayoeService} from '../../../services/unayoe/unayoe.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-mi-perfil-unayoe',
    templateUrl: './mi-perfil-unayoe.component.html',
    styleUrls: ['./mi-perfil-unayoe.component.css']
})
export class MiPerfilUnayoeComponent implements OnInit {

    //Variables
    datos: DatosMiPerfilUnayoe;
    dataActualizar: DatosActualizarUnayoe;

    //Constructor
    constructor( private unayoeService: UnayoeService,
                 private miPerfilUnayoeService: MiPerfilUnayoeService,
                 public dialog: MatDialog) {
    }

    ngOnInit() {
        this.getPerfilUnayoe();
    }

    //Métodos
    getPerfilUnayoe() {
        this.miPerfilUnayoeService.getPerfilUnayoe().subscribe(
            (res: DatosMiPerfilUnayoe) => {
                this.datos = res['data'][0];
            },
            error => {
                console.log(<any> error);
            }
        );
    }
    sendFacebook(){
        window.location.href=this.datos.facebook;
    }
    sendWsp(){
        window.location.href="https://api.whatsapp.com/send?phone="+this.datos.wsp;
    }

    actualizarDatos(datos:DatosActualizarUnayoe ){
      this.miPerfilUnayoeService.updateDataPerfilUnatyoe(datos).subscribe();
    }

    openDialog(): void {

      let dialogRef = this.dialog.open(MiPerfilDialogComponent, {
        data: {
            id: this.unayoeService.getIdUnayoe(),
            nombre: this.datos.nombre,
            apellido_paterno: this.datos.apellido_paterno,
            apellido_materno: this.datos.apellido_materno,
            sexo: this.datos.sexo,
            profesion: this.datos.profesion,
            facebook: this.datos.facebook,
            celular: this.datos.celular,
            correoAlternativo: this.datos.correoAlternativo,
            wsp: this.datos.wsp,
            foto:this.datos.foto,
            auto_descripcion:this.datos.auto_descripcion
        },
      });
      dialogRef.afterClosed().subscribe( (result:DatosActualizarUnayoe) => {
          if(result){
              this.dataActualizar = result;
              this.actualizarDatos(result);
              this.getPerfilUnayoe();
              Swal.fire({
                  position: 'center',
                  type: 'success',
                  title: 'Actualizado correctamente.',
                  showConfirmButton: false,
                  timer: 1500
              })
          }

      },error => {
          Swal.fire({
              position: 'center',
              type: 'error',
              title: 'Error al actualizar.',
              showConfirmButton: false,
              timer: 1500
          })
          console.log(error);
      });
    }

}

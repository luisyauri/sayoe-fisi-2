
import { Component, OnInit } from '@angular/core';
import { MiPerfilService } from '../../../services/mi-perfil.service';
import { Usuario,Data,RootObject } from '../../../models/miPerfil';

import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material';
import { MiPerfilDialogComponent } from '../mi-perfil-dialog/mi-perfil-dialog.component';

export interface datosNuevos {
  correo: string;
  facebook: string;
  celular: string;
  wsp: string;
  auto_descripcion: string;
}


@Component({
  selector: 'app-mi-perfil-unayoe',
  templateUrl: './mi-perfil-unayoe.component.html',
  styleUrls: ['./mi-perfil-unayoe.component.css']
})
export class MiPerfilUnayoeComponent implements OnInit {

  constructor( private miPerfilService: MiPerfilService , public dialog: MatDialog) { }

  datos: Data;

  dataActualizar: datosNuevos;
  correo: String;
  facebook: String;
  celular: String;
  wsp: String;
  auto_descripcion: String;

  ngOnInit() {
    this.getPerfil();
  }

  // Platos Service
  getPerfil() {
    this.miPerfilService.getPerfil().subscribe(
      (res: Data) => {
          this.datos = res['data'][0];
      },
      error => {
          console.log(<any>error);
      }
  );
  }

  actualizarDatos(datos:datosNuevos ){
    this.miPerfilService.actualizarDatos(datos).subscribe();
  }

  openDialog(): void {
    
    let dialogRef = this.dialog.open(MiPerfilDialogComponent, {
      data: { correo: this.correo, facebook: this.facebook,celular: this.celular,wsp: this.wsp,auto_descripcion: this.auto_descripcion }
    });

    dialogRef.afterClosed().subscribe( (result:datosNuevos) => {
      this.dataActualizar = result;
      this.actualizarDatos(result);
      this.getPerfil();
    });
  }
}

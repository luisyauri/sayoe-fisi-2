import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';

import {AuthService} from '../../services/auth.service';
import {Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material';
import {AgregarDialogComponent} from '../administrador/agregar-dialog/agregar-dialog.component';
import {AdministradorService} from '../../services/administrador/administrador.service';

import {PsicologoNuevo} from '../../models/psicologoNuevo';
import * as jwt_decode from 'jwt-decode';

@Component({
    selector: 'app-administrador',
    templateUrl: './administrador.component.html',
    styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {
    nuevo: PsicologoNuevo;
    displayedColumns: string[] = ['id', 'apellidos', 'nombres', 'sexo', 'celular', 'rol', 'estado', 'detalles'];
    dataSource: any;
    listaUnayoPerfil: any;
    banderaSpinner = true;
    apellidosNombresAdministrador: any;
    personalRegistrado: any;
    correoPrincipalAdministrador: any;
    sexoAdministrador: any;
    celularAdministrador: any;
    jsonAdministrador: any;
    constructor(private authService: AuthService,
                private router: Router,
                public dialog: MatDialog,
                private  administradorService: AdministradorService
    ) {
    }

    ngOnInit() {
        this.getDatoAdministrador();
        this.getUnayoePerfiles();
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(AgregarDialogComponent, {
            data: { /*correo: "a", facebook: "b",celular: "c",wsp: "d",auto_descripcion: "e"*/}
        });

        dialogRef.afterClosed().subscribe((result: PsicologoNuevo) => {
            this.nuevo = result;
            // console.log(this.nuevo);
            this.registrarPsicologo(this.nuevo);
            this.getUnayoePerfiles();
        });
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['']);
    }

    getUnayoePerfiles() {
        this.administradorService.getUnayoePerfiles().subscribe(
            result => {
                this.listaUnayoPerfil = JSON.parse(JSON.stringify(result['data']));
                this.dataSource = this.listaUnayoPerfil;
                this.personalRegistrado = this.listaUnayoPerfil.length;
                this.banderaSpinner = false;
            },
            error => {
                console.log(error as any);
            }
        );
    }

    registrarPsicologo(datosNuevos: PsicologoNuevo) {
        this.administradorService.registrarPsicologo(datosNuevos).subscribe();
    }

    getDatoAdministrador() {
        this.administradorService.getDatoAdministrador().subscribe(
            result => {
                this.jsonAdministrador = JSON.parse(JSON.stringify(result));
                this.apellidosNombresAdministrador = this.jsonAdministrador.nombre;
                this.correoPrincipalAdministrador = this.jsonAdministrador.correoPrincipal;
                this.sexoAdministrador = this.jsonAdministrador.sexo;
                this.celularAdministrador = this.jsonAdministrador.celular;
            },
            error => {
                console.log(error as any);
            }
        );
    }

}

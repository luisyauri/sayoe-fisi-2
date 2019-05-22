import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';

import {AuthService} from '../../services/auth.service';
import {Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material';
import {AgregarDialogComponent} from '../administrador/agregar-dialog/agregar-dialog.component';
import {EvalPsiUnayoeService} from '../../services/unayoe/eval-psi-unayoe.service';
import {AdministradorService} from '../../services/administrador/administrador.service';

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
    selector: 'app-administrador',
    templateUrl: './administrador.component.html',
    styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {
    displayedColumns: string[] = ['id', 'apellidos', 'nombres', 'sexo', 'celular', 'rol', 'estado', 'detalles'];
    dataSource: any;
    listaUnayoPerfil: any;
    banderaSpinner = true;
    constructor(private authService: AuthService,
                private router: Router,
                public dialog: MatDialog,
                private  administradorService: AdministradorService
    ) {
    }

    ngOnInit() {
        this.getUnayoePerfiles();
    }

    openDialog(): void {
        let dialogRef = this.dialog.open(AgregarDialogComponent, {
            data: { /*correo: "a", facebook: "b",celular: "c",wsp: "d",auto_descripcion: "e"*/}
        });

        dialogRef.afterClosed().subscribe((result: any) => {
            /*this.dataActualizar = result;
            this.actualizarDatos(result);
            this.getPerfil();*/
            //alert("Se cerro");
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
                this.banderaSpinner = false;
            },
            error => {
                console.log(error as any);
            }
        );
    }

}

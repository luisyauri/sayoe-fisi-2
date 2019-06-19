import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {PerfiPsiPendUnayoeDialogComponent} from './perfi-psi-pend-unayoe-dialog/perfi-psi-pend-unayoe-dialog.component';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {PerfPendPsiUnayoeService} from '../../../services/unayoe/perf-pend-psi-unayoe.service';
import {SendAnhoMesPPUnayoeModel} from '../../../models/unayoe/perfi-psi-pend-unayoe/sendAnhoMesPPUnayoe.model';
import {GetListPPUnayoeModel, PerfilesListPPUnayoeModel} from '../../../models/unayoe/perfi-psi-pend-unayoe/getListPPUnayoe.model';
import {PsicologoNuevo} from '../../../models/psicologoNuevo';

@Component({
    selector: 'app-perfi-psi-pend-unayoe',
    templateUrl: './perfi-psi-pend-unayoe.component.html',
    styleUrls: ['./perfi-psi-pend-unayoe.component.css']
})
export class PerfiPsiPendUnayoeComponent implements OnInit {

    //Variables
    displayedColumns: string[] = ['codigo', 'apellidosNombres', 'escuela', 'situacion', 'fecharesuelto', 'hora','acciones'];
    banderaContenido = false;
    enviarMesAnho: SendAnhoMesPPUnayoeModel = {anho: '', mes: ''};
    date = new Date();
    arrayGetListPPUnayoe: GetListPPUnayoeModel[];
    getListPPUnayoe: GetListPPUnayoeModel;
    getArrayPerfilesUnayoe:PerfilesListPPUnayoeModel[];
    dataSource = new MatTableDataSource();

    situacion = '';
    colorSituacion = false;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
        this.paginator = mp;
        this.dataSource.paginator = this.paginator;
    }
    //Constructor
    constructor(public dialog: MatDialog, private router: Router, private perfPendPsiUnayoeService: PerfPendPsiUnayoeService) {
    }

    ngOnInit() {
        this.getListTotal();
        this.dataSource.paginator = this.paginator;
    }

    //Métodos
    getListTotal(){
        this.getEnviarMesAnho();
        this.getListPerfPendPsi();
    }

    getEnviarMesAnho() {
        this.enviarMesAnho.anho = this.date.getFullYear().toString();
        this.enviarMesAnho.mes = (this.date.getMonth() + 1).toString();
    }
    getListPerfPendPsi() {
        console.log(this.enviarMesAnho);
        this.perfPendPsiUnayoeService.getEnviarMesAnho(this.enviarMesAnho).subscribe(
            (res: GetListPPUnayoeModel) => {
                console.log(res);
                this.arrayGetListPPUnayoe = res['data'];
                this.getListPPUnayoe = this.arrayGetListPPUnayoe[0];
                this.getArrayPerfilesUnayoe = this.getListPPUnayoe.perfiles;
                this.dataSource = new MatTableDataSource(this.getArrayPerfilesUnayoe);
                // this.getDateFormat();
                if(this.getListPPUnayoe.perfiles.length==0){
                    this.banderaContenido= false;
                }else{
                    this.banderaContenido= true;
                }
            },
            error => {
                console.log("Error al extraer la lista de perfiles psicológicos.")
                console.log(error)
            }
        );
    }

    openDialogPerfil(id_perfil_psico: number) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        // dialogConfig.width = '50%';
        dialogConfig.data = {
            id_perfil_psico: id_perfil_psico,
            bandera: 0,
        };
        dialogConfig.maxHeight = '100%';
        this.dialog.open(PerfiPsiPendUnayoeDialogComponent, dialogConfig);
        this.dialog.afterAllClosed.subscribe(value => {
            this.getListTotal();
        });
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        console.log(this.dataSource.filter);
    }

    openPerfilNoCulminados() {
        this.router.navigate(['unayoe/perfiles-psicologicos-no-culminados']);
    }

    convertirFecha(fecha: string) {
        return fecha.slice(8, 10) + '-' + fecha.slice(5, 7) + '-' + fecha.slice(0, 4);
    }
    convertirSituacion(situacion: string) {
        if (situacion == 'R') {
            return 'REGULAR';
        } else if (situacion == 'O') {
            return 'OBSERVADO';
        } else {
            return 'ERROR';
        }
    }
    // getDateFormat(){
    //     for(let i=0;i<this.getArrayPerfilesUnayoe.length;i++){
    //         const fechaVenci = this.getArrayPerfilesUnayoe[i].fecha_resuelto;
    //         const dateMostrarFormat = fechaVenci.slice(8,10)+'-'+fechaVenci.slice(5,7)+'-'+fechaVenci.slice(0,4);
    //         this.getArrayPerfilesUnayoe[i].fecha_resuelto = dateMostrarFormat;
    //     }
    // }
}


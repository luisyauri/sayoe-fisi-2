import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource} from '@angular/material';
import {PerfiPsiPendUnayoeDialogComponent} from '../perfi-psi-pend-unayoe/perfi-psi-pend-unayoe-dialog/perfi-psi-pend-unayoe-dialog.component';
import {ListCitasModel} from '../../../models/unayoe/citas-unayoe/listCitas.model';
import {CitasUnayoeService} from '../../../services/unayoe/citas-unayoe.service';
import {CitasUnayoeDialogComponent} from './citas-unayoe-dialog/citas-unayoe-dialog.component';
import {EstadoUnayoeDialogComponent} from './estado-unayoe-dialog/estado-unayoe-dialog.component';
import {VerUnayoeDialogComponent} from './ver-unayoe-dialog/ver-unayoe-dialog.component';

@Component({
    selector: 'app-citas-unayoe',
    templateUrl: './citas-unayoe.component.html',
    styleUrls: ['./citas-unayoe.component.css']
})
export class CitasUnayoeComponent implements OnInit {

    //Variables
    displayedColumns: string[] = ['asunto', 'codigo', 'nombres', 'sexo', 'situacion', 'fecha', 'hora', 'estado', 'acciones'];

    arrayListCitas: ListCitasModel[];
    dataSource = new MatTableDataSource();

    @ViewChild(MatPaginator) paginator: MatPaginator;

    @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
        this.paginator = mp;
        this.dataSource.paginator = this.paginator;
    }

    banderaContenido = true;

    //Constructor
    constructor(public dialog: MatDialog,
                private citasUnayoeService: CitasUnayoeService) {
    }

    ngOnInit() {
        this.getTotalLis();
    }

    //Métodos
    getTotalLis() {
        this.getListCitas();
        this.dataSource.paginator = this.paginator;
    }

    getListCitas() {
        this.citasUnayoeService.getListaCitas().subscribe(
            (res: ListCitasModel) => {
                this.arrayListCitas = res['data'];
                console.log(this.arrayListCitas);
                this.dataSource = new MatTableDataSource(this.arrayListCitas);
                if (this.arrayListCitas.length == 0) {
                    this.banderaContenido = false;
                } else {
                    this.banderaContenido = true;
                }
            }, error => {

            });
    }

    openDialogCita(element: ListCitasModel) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        // dialogConfig.width = '50%';
        dialogConfig.data = element;
        dialogConfig.maxHeight = '100%';
        this.dialog.open(VerUnayoeDialogComponent, dialogConfig);
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }



    convertirSexo(sexo: string) {
        if (sexo == 'M') {
            return 'MASCULINO';
        } else if (sexo == 'F') {
            return 'FEMENINO';
        } else {
            return 'NO DEFINIDO';
        }
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
    convertirFecha(fecha: string) {
        return fecha.slice(8, 10) + '-' + fecha.slice(5, 7) + '-' + fecha.slice(0, 4);
    }

    asignarCita() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        // dialogConfig.width = '50%';
        dialogConfig.data = {
            data: ''
        };
        dialogConfig.maxHeight = '100%';
        this.dialog.open(CitasUnayoeDialogComponent, dialogConfig);
        this.dialog.afterAllClosed.subscribe(value => {
            this.getTotalLis();
        });
    }

    cambiarEstado(estado: number, id: number) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        // dialogConfig.width = '50%';
        dialogConfig.data = {
            id: id.toString(),
        };
        dialogConfig.maxHeight = '100%';
        this.dialog.open(EstadoUnayoeDialogComponent, dialogConfig);
        this.dialog.afterAllClosed.subscribe(value => {
            this.getTotalLis();
        });
    }

    convertirEstado(estado: number) {
        if (estado == 1) {
            return 'ESPERANDO';
        } else if (estado == 2) {
            return 'ASISTIÓ';
        } else if (estado == 3) {
            return 'NO ASISTIÓ';
        } else {
            return 'ERROR';
        }
    }

}

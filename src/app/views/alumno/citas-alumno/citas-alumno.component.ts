import {Component, OnInit, ViewChild} from '@angular/core';
import {CitasService} from '../../../services/alumno/citas.service';
import {AlumnoService} from '../../../services/alumno/alumno.service';
import {ListCitasModel} from '../../../models/unayoe/citas-unayoe/listCitas.model';
import {MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource} from '@angular/material';
import {CitasUnayoeModel} from '../../../models/alumno/citas-alumno/citasUnayoe.model';
import {EstadoUnayoeDialogComponent} from '../../unayoe/citas-unayoe/estado-unayoe-dialog/estado-unayoe-dialog.component';
import {VerUnayoeDialogComponent} from '../../unayoe/citas-unayoe/ver-unayoe-dialog/ver-unayoe-dialog.component';
import {CitasDialogAlumnoComponent} from './citas-dialog-alumno/citas-dialog-alumno.component';

@Component({
    selector: 'app-citas-alumno',
    templateUrl: './citas-alumno.component.html',
    styleUrls: ['./citas-alumno.component.css']
})
export class CitasAlumnoComponent implements OnInit {

    displayedColumns: string[] = ['asunto', 'fecha', 'hora', 'estado', 'acciones'];

    arrayListCitas: CitasUnayoeModel[];
    dataSource = new MatTableDataSource();

    @ViewChild(MatPaginator) paginator: MatPaginator;

    @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
        this.paginator = mp;
        this.dataSource.paginator = this.paginator;
    }

    banderaContenido = true;

    constructor(
        public dialog: MatDialog,
        private citasService: CitasService,
        private alumnoService: AlumnoService,
    ) {
    }

    ngOnInit() {
        this.getTotalLis();
    }
    getTotalLis() {
        this.getListCitas(this.alumnoService.getIdAlumno());
        this.dataSource.paginator = this.paginator;
    }

    getListCitas(codigo: string) {
        this.citasService.getListCitas(codigo).subscribe(
            res => {
                this.arrayListCitas = res['data'];
                // console.log(this.arrayListCitas);
                this.dataSource = new MatTableDataSource(this.arrayListCitas);
                if (this.arrayListCitas.length == 0) {
                    this.banderaContenido = false;
                } else {
                    this.banderaContenido = true;
                }
            }, error => {

            });
    }

    convertirFecha(fecha: string) {
        return fecha.slice(8, 10) + '-' + fecha.slice(5, 7) + '-' + fecha.slice(0, 4);
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
    openDialogCita(element: CitasUnayoeModel) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        // dialogConfig.width = '50%';
        dialogConfig.data = element;
        dialogConfig.maxHeight = '100%';
        this.dialog.open(CitasDialogAlumnoComponent, dialogConfig);
    }

}

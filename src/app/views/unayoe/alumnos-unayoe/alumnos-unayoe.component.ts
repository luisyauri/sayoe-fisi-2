import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {PerfiPsiPendUnayoeDialogComponent} from '../perfi-psi-pend-unayoe/perfi-psi-pend-unayoe-dialog/perfi-psi-pend-unayoe-dialog.component';
import {AlumnosUnayoeService} from '../../../services/unayoe/alumnos-unayoe.service';
import {GetListPPUnayoeModel} from '../../../models/unayoe/perfi-psi-pend-unayoe/getListPPUnayoe.model';
import {ListAlumnosUnayoeModel} from '../../../models/unayoe/alumnos-unayoe/listAlumnosUnayoe.model';
import {EvalPsiUnayoeDialogComponent} from '../eval-psi-unayoe/eval-psi-unayoe-dialog/eval-psi-unayoe-dialog.component';
import Swal from "sweetalert2";
import {AgregarAlumnoUnayoeComponent} from './agregar-alumno-unayoe/agregar-alumno-unayoe.component';
import {Router} from '@angular/router';
import {DataAlumnoService} from '../../../services/intercambio/data-alumno.service';

@Component({
    selector: 'app-alumnos-unayoe',
    templateUrl: './alumnos-unayoe.component.html',
    styleUrls: ['./alumnos-unayoe.component.css']
})
export class AlumnosUnayoeComponent implements OnInit {

    //Variables
    displayedColumns: string[] = ['codigo','apellidosNombres','escuela','situacion','acciones'];

    banderaContenido= true;
    arrayListAlumnos: ListAlumnosUnayoeModel[];
    dataSource = new MatTableDataSource();
    selected = '2';

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
        this.paginator = mp;
        this.dataSource.paginator = this.paginator;
    }

    //Constructor
    constructor(public dialog: MatDialog,
                private alumnosUnayoeService:AlumnosUnayoeService,
                private router: Router,
                private dataAlumnoService :DataAlumnoService,
    ) { }

    ngOnInit() {
        this.getListAlumnos();
        this.dataSource.paginator = this.paginator;
    }

    //Métodos
    getListAlumnos() {
        this.alumnosUnayoeService.getListAlumnos().subscribe(
            (res: ListAlumnosUnayoeModel) => {
                this.arrayListAlumnos = res['data'];
                // console.log(this.arrayListAlumnos);
                this.dataSource = new MatTableDataSource(this.arrayListAlumnos);
                if(this.arrayListAlumnos.length==0){
                    this.banderaContenido= false;
                }else{
                    this.banderaContenido= true;
                }
            },
            error => {
                console.log("Error al extraer la lista de perfiles psicológicos.")
            }
        );
    }
    openDialogPerfil(codigo: string){
        this.dataAlumnoService.setCodigo(codigo);
        this.router.navigate(['unayoe/perfil-alumno']);
    }
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    openAgregar(){
        if (this.selected == '1') {
        } else if (this.selected == '2') {
            const dialogConfig = new MatDialogConfig();
            // dialogConfig.disableClose = true;
            // dialogConfig.width = '50%';
            dialogConfig.data = {
                // dataEvalPsi: this.datos,
            };
            dialogConfig.maxHeight = '100%';
            this.dialog.open(AgregarAlumnoUnayoeComponent, dialogConfig);
            this.dialog.afterAllClosed.subscribe(value => {
                this.getListAlumnos();
                this.dataSource.paginator = this.paginator;
            });

        } else {
            Swal.fire({
                position: 'center',
                type: 'warning',
                title: 'Seleccione excel o Indivudal.',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    abrirDetalleAlumno(codigo: string) {
            this.dataAlumnoService.setCodigo(codigo);
            this.router.navigate(['unayoe/perfil-alumno']);
    }
}

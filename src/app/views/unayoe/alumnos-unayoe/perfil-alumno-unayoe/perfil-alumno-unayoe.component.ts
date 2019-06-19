import {Component, OnInit, ViewChild} from '@angular/core';
import {DetallerAlumnoUnayoeService} from '../../../../services/unayoe/detaller-alumno-unayoe.service';
import {DataAlumnoService} from '../../../../services/intercambio/data-alumno.service';
import {DataAlumnoUnayoeModal} from '../../../../models/unayoe/alumnos-unayoe/perfil-alumno/dataAlumnoUnayoe.modal';
import {Router} from '@angular/router';
import {ListPPAlumnoUnayoeModal} from '../../../../models/unayoe/alumnos-unayoe/perfil-alumno/listPPAlumnoUnayoe.modal';
import {MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource} from '@angular/material';
import {DetallePefiPsiUnayoeComponent} from '../../detalle-pefi-psi-unayoe/detalle-pefi-psi-unayoe.component';

@Component({
    selector: 'app-perfil-alumno-unayoe',
    templateUrl: './perfil-alumno-unayoe.component.html',
    styleUrls: ['./perfil-alumno-unayoe.component.css']
})
export class PerfilAlumnoUnayoeComponent implements OnInit {

    codigo = '';
    alumno: DataAlumnoUnayoeModal;
    getListPPAlumno: ListPPAlumnoUnayoeModal[];
    displayedColumns: string[] = ['anho', 'fecharecomendacion', 'fecharesuelto','acciones'];
    banderaContenido = false;
    dataSource = new MatTableDataSource();

    @ViewChild(MatPaginator) paginator: MatPaginator;

    @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
        this.paginator = mp;
        this.dataSource.paginator = this.paginator;
    }


    constructor(
        public dialog: MatDialog,
        private detallerAlumnoUnayoeService: DetallerAlumnoUnayoeService,
        private dataAlumnoService: DataAlumnoService,
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.getCodigoPerfilAlumno();
        console.log(this.codigo);
        this.getDatosAlumno(this.codigo);
        this.getPerfilesAlumno(this.codigo);
        if (!this.codigo) {
            this.router.navigate(['unayoe/alumnos']);
        }
        this.dataSource.paginator = this.paginator;
    }

    getCodigoPerfilAlumno() {
        this.dataAlumnoService.currentCodigo.subscribe(value => {
            this.codigo = value;
        });
    }

    getDatosAlumno(codigo: string) {
        this.detallerAlumnoUnayoeService.getDetalleAlumno(codigo).subscribe(
            res => {
                this.alumno= res['data'];
                console.log(this.alumno);
            },
            error => {
                console.log(error);
            })
    }
    getPerfilesAlumno(codigo: string) {
        this.detallerAlumnoUnayoeService.getListPerfilAlumno(codigo).subscribe(
            res => {
                // console.log("ListPerfiles");
                console.log(res);
                this.getListPPAlumno = res['data'];
                this.dataSource = new MatTableDataSource(this.getListPPAlumno);
                // this.getDateFormat();
                if(this.getListPPAlumno.length==0){
                    this.banderaContenido= false;
                }else{
                    this.banderaContenido= true;
                }
            },
            error => {
                console.log(error);
            })
    }


    openDialogPerfil(id_perfil_psico: number) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        // dialogConfig.width = '50%';
        dialogConfig.data = {
            id_perfil_psico: id_perfil_psico,
            bandera: 0,
        };
        dialogConfig.maxHeight = '100%';
        this.dialog.open(DetallePefiPsiUnayoeComponent, dialogConfig);
        this.dialog.afterAllClosed.subscribe(value => {
        });
    }
}

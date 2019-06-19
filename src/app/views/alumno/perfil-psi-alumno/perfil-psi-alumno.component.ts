import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource} from '@angular/material';
import {PerfiPsiPendUnayoeDialogComponent} from '../../unayoe/perfi-psi-pend-unayoe/perfi-psi-pend-unayoe-dialog/perfi-psi-pend-unayoe-dialog.component';
import {ListEPModel} from '../../../models/alumno/perfil-psico-alumno/listEP.model';
import {PerfilPsicoAlumnoService} from '../../../services/alumno/perfil-psico-alumno.service';
import {AlumnoService} from '../../../services/alumno/alumno.service';
import {Router} from '@angular/router';
import {DetallePefiPsiUnayoeComponent} from '../../unayoe/detalle-pefi-psi-unayoe/detalle-pefi-psi-unayoe.component';

@Component({
  selector: 'app-perfil-psi-alumno',
  templateUrl: './perfil-psi-alumno.component.html',
  styleUrls: ['./perfil-psi-alumno.component.css']
})
export class PerfilPsiAlumnoComponent implements OnInit {

  codigo = '';
  getListPPAlumno: ListEPModel[];
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
      private perfilPsicoAlumnoService: PerfilPsicoAlumnoService,
      private alumnoService: AlumnoService,
      private router: Router,
  ) { }

  ngOnInit() {
    this.codigo = this.alumnoService.getIdAlumno();
    this.getPerfilesAlumno(this.codigo);
  }

  getPerfilesAlumno(codigo: string) {
    this.perfilPsicoAlumnoService.getListPerfilAlumno(codigo).subscribe(
        res => {
          this.getListPPAlumno = res['data'];
          console.log(this.getListPPAlumno);
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

import {Component, OnInit, ViewChild} from '@angular/core';
import {DataAlumnoUnayoeModal} from '../../../models/unayoe/alumnos-unayoe/perfil-alumno/dataAlumnoUnayoe.modal';
import {ListPPAlumnoUnayoeModal} from '../../../models/unayoe/alumnos-unayoe/perfil-alumno/listPPAlumnoUnayoe.modal';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {ListEPModel} from '../../../models/alumno/perfil-psico-alumno/listEP.model';
import {DetallerAlumnoUnayoeService} from '../../../services/unayoe/detaller-alumno-unayoe.service';
import {DataAlumnoService} from '../../../services/intercambio/data-alumno.service';
import {Router} from '@angular/router';
import {PerfilPsicoAlumnoService} from '../../../services/alumno/perfil-psico-alumno.service';
import {AlumnoService} from '../../../services/alumno/alumno.service';

@Component({
  selector: 'app-mi-perfil-alumno',
  templateUrl: './mi-perfil-alumno.component.html',
  styleUrls: ['./mi-perfil-alumno.component.css']
})
export class MiPerfilAlumnoComponent implements OnInit {

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
}

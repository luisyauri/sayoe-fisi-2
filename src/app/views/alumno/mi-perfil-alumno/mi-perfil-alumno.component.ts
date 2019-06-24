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
import {PerfilAlumnoService} from '../../../services/alumno/perfil-alumno.service';
import {DatosAlumnoModel} from '../../../models/alumno/perfil-alumno/datosAlumno.model';

@Component({
  selector: 'app-mi-perfil-alumno',
  templateUrl: './mi-perfil-alumno.component.html',
  styleUrls: ['./mi-perfil-alumno.component.css']
})
export class MiPerfilAlumnoComponent implements OnInit {

  codigo = '';
  alumno : DatosAlumnoModel;

  constructor(
      private perfilAlumnoService: PerfilAlumnoService,
      private alumnoService: AlumnoService,
      private router: Router,
  ) { }

  ngOnInit() {
    this.codigo = this.alumnoService.getIdAlumno();
    this.getPerfilAlumno(this.codigo);
  }

  getPerfilAlumno(codigo: string) {
    this.perfilAlumnoService.getPerfilAlumno(codigo).subscribe(
        res => {
          this.alumno = res['data'];
          console.log(this.alumno);
        },
        error => {
          console.log(error);
        })
  }
}

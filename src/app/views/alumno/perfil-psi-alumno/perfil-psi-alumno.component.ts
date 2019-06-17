import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource} from '@angular/material';
import {PerfiPsiPendUnayoeDialogComponent} from '../../unayoe/perfi-psi-pend-unayoe/perfi-psi-pend-unayoe-dialog/perfi-psi-pend-unayoe-dialog.component';

@Component({
  selector: 'app-perfil-psi-alumno',
  templateUrl: './perfil-psi-alumno.component.html',
  styleUrls: ['./perfil-psi-alumno.component.css']
})
export class PerfilPsiAlumnoComponent implements OnInit {

  //Variables
  displayedColumns: string[] = ['codigo','acciones'];
  arrayGetPPP = [
    {codigo:'01/12/19'},
    {codigo:'01/12/19'},
    {codigo:'01/12/19'},
  ];
  dataSource = new MatTableDataSource(this.arrayGetPPP);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.dataSource.paginator = this.paginator;
  }

  banderaContenido= true;

  //Constructor
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  //Métodos
  openDialogPerfil(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    // dialogConfig.width = '50%';
    dialogConfig.data = {
      data : 'Hola'
    };
    dialogConfig.maxHeight = '100%';
    this.dialog.open(PerfiPsiPendUnayoeDialogComponent, dialogConfig);
  }
}

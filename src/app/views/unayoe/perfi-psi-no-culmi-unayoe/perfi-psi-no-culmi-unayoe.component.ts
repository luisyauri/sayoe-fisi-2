import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource} from '@angular/material';
import {PerfiPsiPendUnayoeDialogComponent} from '../perfi-psi-pend-unayoe/perfi-psi-pend-unayoe-dialog/perfi-psi-pend-unayoe-dialog.component';

@Component({
  selector: 'app-perfi-psi-no-culmi-unayoe',
  templateUrl: './perfi-psi-no-culmi-unayoe.component.html',
  styleUrls: ['./perfi-psi-no-culmi-unayoe.component.css']
})
export class PerfiPsiNoCulmiUnayoeComponent implements OnInit {

  //Variables
  displayedColumns: string[] = ['codigo','apellidosNombres','escuela','situacion','acciones'];
  arrayGetPPP = [
    {codigo:1,apellidosNombres: "Luis David",escuela: "Sistemas",situacion: 'Regular'},
    {codigo:2,apellidosNombres: "Luis David",escuela: "Sistemas",situacion: 'Regular'},
    {codigo:3,apellidosNombres: "Luis David",escuela: "Sistemas",situacion: 'Regular'},
    {codigo:4,apellidosNombres: "Luis Erick",escuela: "Sistemas",situacion: 'Regular'},
    {codigo:5,apellidosNombres: "Luis David",escuela: "Software",situacion: 'Regular'},
    {codigo:6,apellidosNombres: "Luis David",escuela: "Software",situacion: 'Regular'},
    {codigo:7,apellidosNombres: "Luis David",escuela: "Software",situacion: 'Regular'},
    {codigo:8,apellidosNombres: "Luis David",escuela: "Software",situacion: 'Regular'},
    {codigo:9,apellidosNombres: "Luis David",escuela: "Software",situacion: 'Regular'},
    {codigo:10,apellidosNombres: "Luis David",escuela: "Software",situacion: 'Regular'},
    {codigo:11,apellidosNombres: "Luis David",escuela: "Software",situacion: 'Regular'},
    {codigo:12,apellidosNombres: "Luis David",escuela: "Software",situacion: 'Regular'},
    {codigo:13,apellidosNombres: "Luis David",escuela: "Software",situacion: 'Regular'},
    {codigo:14,apellidosNombres: "Luis David",escuela: "Software",situacion: 'Regular'},
    {codigo:15,apellidosNombres: "Luis David",escuela: "Software",situacion: 'Regular'},
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
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

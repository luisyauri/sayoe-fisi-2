import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource} from '@angular/material';
import {PerfiPsiPendUnayoeDialogComponent} from '../perfi-psi-pend-unayoe/perfi-psi-pend-unayoe-dialog/perfi-psi-pend-unayoe-dialog.component';

@Component({
  selector: 'app-citas-unayoe',
  templateUrl: './citas-unayoe.component.html',
  styleUrls: ['./citas-unayoe.component.css']
})
export class CitasUnayoeComponent implements OnInit {

  //Variables
  displayedColumns: string[] = ['ncita','asunto','fecha','hora','estado','acciones'];
  arrayGetPPP = [
    {ncita:1,asunto: "Venir",fecha: "01/11/10",hora: '10:00 horas',estado: 'Asistio'},
    {ncita:1,asunto: "Venir",fecha: "01/11/10",hora: '10:00 horas',estado: 'No asistio'},
    {ncita:1,asunto: "Venir",fecha: "01/11/10",hora: '10:00 horas',estado: 'No asistio'},
    {ncita:1,asunto: "Venir",fecha: "01/11/10",hora: '10:00 horas',estado: 'No asistio'},
    {ncita:1,asunto: "Venir",fecha: "01/11/10",hora: '10:00 horas',estado: 'No asistio'},
    {ncita:1,asunto: "Venir",fecha: "01/11/10",hora: '10:00 horas',estado: 'No asistio'},
    {ncita:1,asunto: "Venir",fecha: "01/11/10",hora: '10:00 horas',estado: 'Esperando'},
    {ncita:1,asunto: "Venir",fecha: "01/11/10",hora: '10:00 horas',estado: 'Esperando'},
    {ncita:1,asunto: "Venir",fecha: "01/11/10",hora: '10:00 horas',estado: 'Esperando'},
    {ncita:1,asunto: "Venir",fecha: "01/11/10",hora: '10:00 horas',estado: 'Esperando'},
    {ncita:1,asunto: "Venir",fecha: "01/11/10",hora: '10:00 horas',estado: 'Esperando'},
    {ncita:1,asunto: "Venir",fecha: "01/11/10",hora: '10:00 horas',estado: 'Asistio'},
    {ncita:1,asunto: "Venir",fecha: "01/11/10",hora: '10:00 horas',estado: 'Asistio'},
    {ncita:1,asunto: "Venir",fecha: "01/11/10",hora: '10:00 horas',estado: 'Asistio'},
    {ncita:1,asunto: "Venir",fecha: "01/11/10",hora: '10:00 horas',estado: 'Asistio'},
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

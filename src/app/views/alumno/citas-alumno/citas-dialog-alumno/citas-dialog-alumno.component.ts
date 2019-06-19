import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ListCitasModel} from '../../../../models/unayoe/citas-unayoe/listCitas.model';
import {CitasUnayoeModel} from '../../../../models/alumno/citas-alumno/citasUnayoe.model';

@Component({
  selector: 'app-citas-dialog-alumno',
  templateUrl: './citas-dialog-alumno.component.html',
  styleUrls: ['./citas-dialog-alumno.component.css']
})
export class CitasDialogAlumnoComponent implements OnInit {

  constructor(
      public dialogConfig: MatDialogRef<CitasDialogAlumnoComponent>,
      @Inject(MAT_DIALOG_DATA) public data: CitasUnayoeModel,
  ) { }

  ngOnInit() {
    console.log(this.data);
  }

  close() {
    this.dialogConfig.close();
  }

}

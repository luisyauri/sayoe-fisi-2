import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {SendDatosDialogUnayoe} from '../../../../models/unayoe/evaluaciones-psicologicas-unayoe/evalPsicoUnayoe.model';
import {ListCitasModel} from '../../../../models/unayoe/citas-unayoe/listCitas.model';
import Swal from "sweetalert2";

@Component({
  selector: 'app-ver-unayoe-dialog',
  templateUrl: './ver-unayoe-dialog.component.html',
  styleUrls: ['./ver-unayoe-dialog.component.css']
})
export class VerUnayoeDialogComponent implements OnInit {

  constructor(
      public dialogConfig: MatDialogRef<VerUnayoeDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: ListCitasModel,
  ) { }

  ngOnInit() {
    console.log(this.data);
  }

  close() {
    this.dialogConfig.close();
  }

}

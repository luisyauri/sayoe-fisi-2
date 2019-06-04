import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {EvalPsiUnayoeService} from '../../../../services/unayoe/eval-psi-unayoe.service';
import {EvalPsicoUnayoe} from '../../../../models/unayoe/evaluaciones-psicologicas-unayoe/evalPsicoUnayoe.model';

export interface DialogData {
  id: bigint;
}

@Component({
  selector: 'app-eval-psi-unayoe-list',
  templateUrl: './eval-psi-unayoe-list.component.html',
  styleUrls: ['./eval-psi-unayoe-list.component.css']
})
export class EvalPsiUnayoeListComponent implements OnInit {

  // Variables
  evalPiscoTitulo: any;
  alternativaSeleccionada: string;
  id: any;
  banderaSpinner = false;

  // Constructor
  constructor(public dialogConfig: MatDialogRef<EvalPsiUnayoeListComponent>,
              @Inject(MAT_DIALOG_DATA) public data: EvalPsicoUnayoe,
              private  evalPsiUnayoeService: EvalPsiUnayoeService) {
    this.id = data.id;
  }
  ngOnInit() {
  }
  // Metodos
  panelOpenState = false;
  onNoClick(): void {
    this.dialogConfig.close();
  }

}


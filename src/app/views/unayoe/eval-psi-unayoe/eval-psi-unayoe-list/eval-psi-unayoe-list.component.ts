import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {EvalPsiUnayoeService} from '../../../../services/unayoe/eval-psi-unayoe.service';

export interface DialogData {
  id: bigint;
}

@Component({
  selector: 'app-eval-psi-unayoe-list',
  templateUrl: './eval-psi-unayoe-list.component.html',
  styleUrls: ['./eval-psi-unayoe-list.component.css']
})
export class EvalPsiUnayoeListComponent implements OnInit {

  evalPisco: any;
  listPreguntas: any;
  evalPiscoTitulo: any;
  alternativaSeleccionada: string;
  id: any;

  constructor(public dialogConfig: MatDialogRef<EvalPsiUnayoeListComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private  evalPsiUnayoeService: EvalPsiUnayoeService) {
    this.id = data.id;
  }

  ngOnInit() {
    this.getPreguntasEvaluacionesPsicologicas();
  }

  getPreguntasEvaluacionesPsicologicas(){
    this.evalPsiUnayoeService.getEvaluacionesPsicologicas().subscribe(
        result=>{
          this.evalPisco = JSON.parse(JSON.stringify(result['data'][this.id-1]));
          this.evalPiscoTitulo = this.evalPisco.titulo;
          this.listPreguntas = this.evalPisco.preguntas;
        },
        error =>{
          console.log(<any>error);
        }
    )
  }

  panelOpenState = false;

  onNoClick(): void {
    this.dialogConfig.close();
  }

}

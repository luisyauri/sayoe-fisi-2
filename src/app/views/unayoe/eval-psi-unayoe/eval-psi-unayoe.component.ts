import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {EvalPsiUnayoeDialogComponent} from './eval-psi-unayoe-dialog/eval-psi-unayoe-dialog.component';
import {EvalPsiUnayoeService} from '../../../services/unayoe/eval-psi-unayoe.service';
import {EvalPsiUnayoeListComponent} from './eval-psi-unayoe-list/eval-psi-unayoe-list.component';

export interface DialogSelected {
  valueSelected: string;
}
@Component({
  selector: 'app-eval-psi-unayoe',
  templateUrl: './eval-psi-unayoe.component.html',
  styleUrls: ['./eval-psi-unayoe.component.css']
})
export class EvalPsiUnayoeComponent implements OnInit {

  valueSelected: string;
  evalPisco: any;
  selected = '';
  displayedColumns: string[] = ['titulo', 'autor', 'preguntas', 'detalles'];
  dataSource: any;
  banderaSpinner = true;
  constructor(public dialog: MatDialog, private  evalPsiUnayoeService: EvalPsiUnayoeService) { }

  ngOnInit() {
    this.getEvaluacionesPsicologicas();

  }

  getEvaluacionesPsicologicas() {
    this.evalPsiUnayoeService.getEvaluacionesPsicologicas().subscribe(
        result => {
          this.evalPisco = JSON.parse(JSON.stringify(result['data']));
          this.dataSource = this.evalPisco;
          this.banderaSpinner = false;
        },
        error => {
          console.log(<any> error);
        }
    )
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.width = "50%";
    this.dialog.open(EvalPsiUnayoeDialogComponent, dialogConfig);
  }

  openDialogList(id){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.width = "70%";
      dialogConfig.height = "90%";
      dialogConfig.data = {id: id};

      this.dialog.open(EvalPsiUnayoeListComponent, dialogConfig);
  }
}



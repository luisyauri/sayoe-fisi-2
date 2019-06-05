import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DatosActualizarUnayoe} from '../../../../models/unayoe/mi-perfil-unayoe/datosActualizarUnayoe.model';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-mi-perfil-dialog',
  templateUrl: './mi-perfil-dialog.component.html',
  styleUrls: ['./mi-perfil-dialog.component.css']
})
export class MiPerfilDialogComponent {

  email = new FormControl('', [Validators.required, Validators.email]);


  constructor(
    public dialogRef: MatDialogRef<MiPerfilDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DatosActualizarUnayoe) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'Escriba su correo.' :
        this.email.hasError('email') ? 'Correo no válido.' :
            '';
  }
}

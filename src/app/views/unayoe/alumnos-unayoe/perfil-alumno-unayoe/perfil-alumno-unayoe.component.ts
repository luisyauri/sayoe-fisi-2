import {Component, OnInit} from '@angular/core';
import {DetallerAlumnoUnayoeService} from '../../../../services/unayoe/detaller-alumno-unayoe.service';
import {DataAlumnoService} from '../../../../services/intercambio/data-alumno.service';
import {DataAlumnoUnayoeModal} from '../../../../models/unayoe/alumnos-unayoe/perfil-alumno/dataAlumnoUnayoe.modal';
import {Router} from '@angular/router';

@Component({
    selector: 'app-perfil-alumno-unayoe',
    templateUrl: './perfil-alumno-unayoe.component.html',
    styleUrls: ['./perfil-alumno-unayoe.component.css']
})
export class PerfilAlumnoUnayoeComponent implements OnInit {

    codigo = '';
    alumno: DataAlumnoUnayoeModal;

    constructor(
        private detallerAlumnoUnayoeService: DetallerAlumnoUnayoeService,
        private dataAlumnoService: DataAlumnoService,
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.getCodigoPerfilAlumno();
        console.log(this.codigo);
        this.getDatosAlumno(this.codigo);
        if (!this.codigo) {
            this.router.navigate(['unayoe/alumnos']);
        }
    }

    getCodigoPerfilAlumno() {
        this.dataAlumnoService.currentCodigo.subscribe(value => {
            this.codigo = value;
        });
    }

    getDatosAlumno(codigo: string) {
        this.detallerAlumnoUnayoeService.getDetalleAlumno(codigo).subscribe(
            res => {
                this.alumno= res['data'];
                console.log(this.alumno);
            },
            error => {
                console.log(error);
            })
    }
}

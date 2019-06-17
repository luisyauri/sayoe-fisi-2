import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {AuthService} from '../../services/auth.service';
import {AlumnoService} from '../../services/alumno/alumno.service';
import {Router} from '@angular/router';
import Swal from "sweetalert2";

@Component({
    selector: 'app-alumno',
    templateUrl: './alumno.component.html',
    styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {

    //Variables
    mobileQuery: MediaQueryList;
    itemSecciones = [
        {title: 'Dashboard', icon: 'fas fa-home', route: 'inicio'},
        {title: 'Evaluaciones Pendientes', icon: 'fas fa-file-signature', route: 'evaluaciones-psicologicas-pendientes'},
        {title: 'Evaluaciones Realizadas', icon: 'fas fa-file-contract', route: 'evaluaciones-psicologicas-realizadas'},
        {title: 'Perfil Piscológico', icon: 'fas fa-id-badge', route: 'perfil-psicologico'},
        {title: 'Citas', icon: 'fas fa-calendar-alt', route: 'citas'},
    ];
    alumno = {nombre: '', foto: ''};

    //Constructor
    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
                private authService: AuthService,
                private alumnoService: AlumnoService,
                private router: Router
    ) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit() {
        this.getDatosGeneralesUnayoe();
    }

    //Métodos
    private _mobileQueryListener: () => void;

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }
    logout() {
        Swal.fire({
            title: '¿Estás seguro de salir?',
            type: 'warning',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#5867dd',
            cancelButtonColor: '#fd397a',
            confirmButtonText: 'Sí, salir!',
            cancelButtonText:'Cancelar',
        }).then((result) => {
            if (result.value) {
                this.authService.logout();
                this.router.navigate(['']);
            }
        })
    }
    getDatosGeneralesUnayoe() {
        this.alumnoService.getDatosGenerales().subscribe(
            result => {
                const jsonDatosGeneralesAlumno = JSON.parse(JSON.stringify(result));
                this.alumno.nombre = jsonDatosGeneralesAlumno.nombre;
                this.alumno.foto = jsonDatosGeneralesAlumno.foto;
            },
            error => {
                console.log(error as any);
            }
        );
    }


}

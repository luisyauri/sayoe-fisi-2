import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {UnayoeService} from '../../services/unayoe/unayoe.service';
import Swal from "sweetalert2";

@Component({
    selector: 'app-unayoe',
    templateUrl: './unayoe.component.html',
    styleUrls: ['./unayoe.component.css']
})
export class UnayoeComponent implements OnDestroy, OnInit {

    //Variables
    mobileQuery: MediaQueryList;
    itemSecciones = [
        {title: 'Dashboard', icon: 'fas fa-home', route: 'inicio'},

        {title: 'Evaluaciones Psicológicas', icon: 'fas fa-file-alt', route: 'evaluaciones-psicologicas'},
        {title: 'Perfiles Psicológicos', icon: 'fas fa-file-signature', route: 'perfiles-psicologicos-pendientes'},
        {title: 'Recomendaciones', icon: 'fas fa-file-contract', route: 'perfiles-psicologicos-realizados'},
        {title: 'Alumnos', icon: 'fas fa-users', route: 'alumnos'},
        {title: 'Citas', icon: 'fas fa-calendar-alt', route: 'citas'},
        {title: 'Estadisticas', icon: 'fas fa-chart-bar', route: 'estadisticas'},
    ];
    unayoe = {nombre:'',foto:''};


    //Constructor
    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
                private authService: AuthService,
                private unayoeService: UnayoeService,
                private router: Router) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit(): void {
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
        this.unayoeService.getDatosGenerales().subscribe(
            result => {
                const jsonDatosGeneralesUnayoe = JSON.parse(JSON.stringify(result));
                this.unayoe.nombre = jsonDatosGeneralesUnayoe.nombre;
                this.unayoe.foto = jsonDatosGeneralesUnayoe.foto;
            },
            error => {
                console.log(error as any);
            }
        );
    }



}

import {Component, OnInit} from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-redireccion',
    templateUrl: './redireccion.component.html',
    styleUrls: ['./redireccion.component.css']
})
export class RedireccionComponent implements OnInit {
    private rolUnayoe: any;
    private rolAlumno: any;
    private rolAdministrador: any;

    constructor(private router: Router) {
    }

    ngOnInit() {
        this.rolUnayoe = 542687;
        this.rolAlumno = 128963;
        this.rolAdministrador = 685429;
        if (localStorage.getItem('access_token') != null) {
            const decodToken = jwt_decode(localStorage.getItem('access_token'));
            const idRol = decodToken.rol.id;
            if (idRol === this.rolUnayoe) {
                this.router.navigate(['unayoe/inicio']);
                Swal.fire({
                    position: 'center',
                    title: 'Bienvenido :) !',
                    text: 'Hoy es un gran día.',
                    imageUrl: 'https://media.giphy.com/media/oDLDbBgf0dkis/giphy.gif',
                    imageWidth: 300,
                    imageHeight: 200,
                    imageAlt: 'Cargando',
                    showConfirmButton: true,
                    confirmButtonColor: '#5867dd',
                    timer: 8000,
                    confirmButtonText: '¡Entendido!',
                    focusConfirm: true,
                });
            } else if (idRol === this.rolAlumno) {
                this.router.navigate(['alumno/inicio']);
                Swal.fire({
                    position: 'center',
                    title: 'Bienvenido :) !',
                    text: 'Comencemos una nueva experiencia.',
                    imageUrl: 'https://media.giphy.com/media/oDLDbBgf0dkis/giphy.gif',
                    imageWidth: 300,
                    imageHeight: 200,
                    imageAlt: 'Cargando',
                    showConfirmButton: true,
                    confirmButtonColor: '#5867dd',
                    timer: 8000,
                    confirmButtonText: '¡Entendido!',
                    focusConfirm: true,
                });
            } else if (idRol === this.rolAdministrador) {
                this.router.navigate(['administrador']);
            } else {
                this.router.navigate(['']);
            }
        } else {
            this.router.navigate(['']);
        }
    }

}

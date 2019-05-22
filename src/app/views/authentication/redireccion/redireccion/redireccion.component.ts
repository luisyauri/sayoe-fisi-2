import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import {Router} from '@angular/router';

@Component({
  selector: 'app-redireccion',
  templateUrl: './redireccion.component.html',
  styleUrls: ['./redireccion.component.css']
})
export class RedireccionComponent implements OnInit {
  private rolUnayoe: any;
  private rolAlumno: any;
  private rolAdministrador: any;
  constructor(private router: Router) { }

  ngOnInit() {
    this.rolUnayoe = 542687;
    this.rolAlumno = 128963;
    this.rolAdministrador = 123456;
    if (localStorage.getItem('access_token') != null) {
      const decodToken = jwt_decode(localStorage.getItem('access_token'));
      const idRol = decodToken.rol.id;
      if (idRol === this.rolUnayoe ) {
        this.router.navigate(['administrador']);
      } else if (idRol === this.rolAlumno ) {
        this.router.navigate(['administrador']);
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

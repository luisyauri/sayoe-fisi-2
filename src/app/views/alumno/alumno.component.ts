import { Component, OnInit } from '@angular/core';

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
    {title: 'Mi Perfil', icon: 'fas fa-user-circle', route: 'mi-perfil'},
    {title: 'E.P. Pendientes', icon: 'fas fa-file-alt', route: 'evaluaciones-psicologicas'},
    {title: 'E.P. Realizadas', icon: 'fas fa-users', route: 'alumnos'},
    {title: 'Perfiles Psicológicos', icon: 'fas fa-chart-bar', route: 'estadisticas'},
    {title: 'Citas', icon: 'fas fa-calendar-alt', route: 'citas'},

  ];
  unayoe = {nombre:'',foto:''};

  constructor() { }

  ngOnInit() {
  }

}

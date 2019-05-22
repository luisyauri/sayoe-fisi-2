import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unayoe',
  templateUrl: './unayoe.component.html',
  styleUrls: ['./unayoe.component.css']
})
export class UnayoeComponent implements OnDestroy {

  mobileQuery: MediaQueryList;
  itemSecciones = [
      {title: 'Dashboard', icon: 'fas fa-home', route: 'inicio'},
      {title: 'Mi Perfil', icon: 'fas fa-user-circle', route: 'mi-perfil'},
      {title: 'Evaluaciones Psicológicas', icon: 'fas fa-file-alt', route: 'evaluaciones-psicologicas'},
      {title: 'Alumnos', icon: 'fas fa-users', route: 'alumnos'},
      {title: 'Citas', icon: 'fas fa-calendar-alt', route: 'citas'},
      {title: 'Estadisticas', icon: 'fas fa-chart-bar', route: 'estadisticas'},
      ];

  fillerContent = Array.from({length: 50}, () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
              private authService: AuthService,
              private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout() {
      this.authService.logout();
      this.router.navigate(['']);
  }

}

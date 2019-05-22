import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AlumnoGuard implements CanActivate, CanActivateChild, CanLoad {

  private rolAlumno: any;

  constructor(private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.rolAlumno = 128963;
    // Decodificando token
    const decodToken = jwt_decode(localStorage.getItem('access_token'));
    const idRol = decodToken.rol.id;
    console.log(idRol);
    if (localStorage.getItem('access_token') && idRol === this.rolAlumno ) {
      console.log('Pertenece a esta vista Padre Alumno')
      return true;
    } else {
      console.log('No pertenece a esta vista Padre Alumno');
      this.router.navigate(['']);
      return false;
    }
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}

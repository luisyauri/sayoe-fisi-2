import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class UnayoeGuard implements CanActivate, CanActivateChild, CanLoad {

  private rolUnayoe: any;
  constructor(private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.rolUnayoe = 542687;
    // Decodificando token
    const decodToken = jwt_decode(localStorage.getItem('access_token'));
    const idRol = decodToken.rol.id;
    if (localStorage.getItem('access_token') && this.rolUnayoe ) {
      console.log('Pertenece a esta vista Padre Unayoe')
      return true;
    } else {
      console.log('No pertenece a esta vista Padre Unayoe');
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

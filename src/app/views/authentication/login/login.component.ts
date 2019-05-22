import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public correo: string;
  public contrasenha: string;
  public error: string;
  banderaLogin=-1;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  public submit() {
      this.banderaLogin=0;
      console.log("1 : "+this.banderaLogin);
      this.auth.login(this.correo, this.contrasenha)
        .pipe(first())
        .subscribe(
            result => this.router.navigate(['redirec']),
            err => this.error = 'Datos Incorrectos'
        );
    this.banderaLogin=-1;
    console.log("2 : "+this.banderaLogin);
  }
}

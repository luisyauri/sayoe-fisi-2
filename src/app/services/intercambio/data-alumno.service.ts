import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataAlumnoService {
  private codigo = new BehaviorSubject<string>('');

  currentCodigo = this.codigo.asObservable();

  setCodigo(codigo:string){
    this.codigo.next(codigo);
  }

  constructor() { }
}


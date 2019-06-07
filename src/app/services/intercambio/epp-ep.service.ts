import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EppEpService {
  private id_cuest_eval = new BehaviorSubject<number>(0);
  private id_perfil_psico = new BehaviorSubject<number>(0);
  currentId_cuest_eval = this.id_cuest_eval.asObservable();
  currendId_perfil_psico = this.id_perfil_psico.asObservable();

  setId_cuest_eval(id_cuest_eval:number){
    this.id_cuest_eval.next(id_cuest_eval);
  }
  setId_perfil_psico(id_perfil_psico:number){
    this.id_perfil_psico.next(id_perfil_psico);
  }

  constructor() { }
}

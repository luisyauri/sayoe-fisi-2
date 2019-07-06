import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource} from '@angular/material';
import {PerfiPsiPendUnayoeDialogComponent} from '../perfi-psi-pend-unayoe/perfi-psi-pend-unayoe-dialog/perfi-psi-pend-unayoe-dialog.component';
import {SendAnhoMesPPUnayoeModel} from '../../../models/unayoe/perfi-psi-pend-unayoe/sendAnhoMesPPUnayoe.model';
import {GetListPPUnayoeModel, PerfilesListPPUnayoeModel} from '../../../models/unayoe/perfi-psi-pend-unayoe/getListPPUnayoe.model';
import {Router} from '@angular/router';
import {PerfPendPsiUnayoeService} from '../../../services/unayoe/perf-pend-psi-unayoe.service';
import {SenAnhoMesPRUnayoeModel} from '../../../models/unayoe/peri-psi-real-unayoe/senAnhoMesPRUnayoe';
import {GetListPRUnayoeModel, PerfilesListPRUnayoeModel} from '../../../models/unayoe/peri-psi-real-unayoe/getListPRUnayoe.model';
import {PerfRealiPsiUnayoeService} from '../../../services/unayoe/perf-reali-psi-unayoe.service';
import {DetallePefiPsiUnayoeComponent} from '../detalle-pefi-psi-unayoe/detalle-pefi-psi-unayoe.component';

@Component({
  selector: 'app-perfi-psi-real-unayoe',
  templateUrl: './perfi-psi-real-unayoe.component.html',
  styleUrls: ['./perfi-psi-real-unayoe.component.css']
})
export class PerfiPsiRealUnayoeComponent implements OnInit {

  //Variables
  displayedColumns: string[] = ['codigo', 'apellidosNombres', 'escuela', 'situacion', 'fechaRecomendada', 'hora','acciones'];
  banderaContenido = false;
  enviarMesAnho: SenAnhoMesPRUnayoeModel = {anho: '', mes: ''};
  date = new Date();
  arrayGetListPRUnayoe: GetListPRUnayoeModel[];
  getListPRUnayoe: GetListPRUnayoeModel;
  getArrayPerfilesUnayoe:PerfilesListPRUnayoeModel[];
  dataSource = new MatTableDataSource();
  situacion = '';
  colorSituacion = false;
  realizo = '';

  // dataSource = new MatTableDataSource(this.arrayGetPPP);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.dataSource.paginator = this.paginator;
  }
  //Constructor
  constructor(public dialog: MatDialog, private router: Router, private perfRealiPsiUnayoeService: PerfRealiPsiUnayoeService) {
  }

  ngOnInit() {
    this.getListTotal();
    this.dataSource.paginator = this.paginator;
  }

  //Métodos
  getListTotal(){
    this.getEnviarMesAnho();
    this.getListPerfRealPsi();
  }

  getEnviarMesAnho() {
    this.enviarMesAnho.anho = this.date.getFullYear().toString();
    this.enviarMesAnho.mes = (this.date.getMonth() + 1).toString();
  }

  getListPerfRealPsi() {
    this.perfRealiPsiUnayoeService.getEnviarMesAnho(this.enviarMesAnho).subscribe(
        (res: GetListPRUnayoeModel) => {
          this.arrayGetListPRUnayoe = res['data'];
          console.log(res);
          this.getListPRUnayoe = this.arrayGetListPRUnayoe[0];
          this.getArrayPerfilesUnayoe = this.getListPRUnayoe.perfiles;
          this.dataSource = new MatTableDataSource(this.getArrayPerfilesUnayoe);
          // this.getDateFormat();
          if(this.getListPRUnayoe.perfiles.length==0){
            this.banderaContenido= false;
          }else{
            this.banderaContenido= true;
          }
        },
        error => {
          console.log("Error al extraer la lista de perfiles psicológicos.")
        }
    );
  }

  openDialogPerfil(id_perfil_psico: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    // dialogConfig.width = '50%';
    dialogConfig.data = {
      id_perfil_psico: id_perfil_psico,
      bandera: 0,
    };
    dialogConfig.maxHeight = '100%';
    this.dialog.open(DetallePefiPsiUnayoeComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(value => {
      this.getListTotal();
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filter);
  }

  convertirFecha(fecha: string) {
    return fecha.slice(8, 10) + '-' + fecha.slice(5, 7) + '-' + fecha.slice(0, 4);
  }
  convertirSituacion(situacion: string) {
    if (situacion == 'R') {
      return 'REGULAR';
    } else if (situacion == 'O') {
      return 'OBSERVADO';
    } else {
      return 'ERROR';
    }
  }

  // getDateFormat(){
  //   for(let i=0;i<this.getArrayPerfilesUnayoe.length;i++){
  //     const fechaVenci = this.getArrayPerfilesUnayoe[i].fecha_resuelto;
  //     const dateMostrarFormat = fechaVenci.slice(8,10)+'-'+fechaVenci.slice(5,7)+'-'+fechaVenci.slice(0,4);
  //     this.getArrayPerfilesUnayoe[i].fecha_resuelto = dateMostrarFormat;
  //   }
  // }

  // detectarNoRealizo(codigo: any, hora: any, hora2: any) {
  //
  //   // console.log(hora);
  //   // console.log(hora2);
  //   if(hora == hora2){
  //     this.realizo = '0'
  //   }else{
  //     this.realizo = '1'
  //   }
  //   return codigo;
  // }

}

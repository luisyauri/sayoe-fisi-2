import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource} from '@angular/material';
import {PerfiPsiPendUnayoeDialogComponent} from '../perfi-psi-pend-unayoe/perfi-psi-pend-unayoe-dialog/perfi-psi-pend-unayoe-dialog.component';
import {SendAnhoMesPNCUnayoeModel} from '../../../models/unayoe/perf-psi-no-culm-unayoe/sendAnhoMesPNCUnayoe.model';
import {GetListPNCUnayoeModel, PerfilesListPNCUnayoeModel} from '../../../models/unayoe/perf-psi-no-culm-unayoe/getListPNCUnayoe.model';
import {GetListPPUnayoeModel} from '../../../models/unayoe/perfi-psi-pend-unayoe/getListPPUnayoe.model';
import {PerfPendPsiUnayoeService} from '../../../services/unayoe/perf-pend-psi-unayoe.service';
import {PerfNoCulmPsiUnayoeService} from '../../../services/unayoe/perf-no-culm-psi-unayoe.service';
import {DetallePefiPsiUnayoeComponent} from '../detalle-pefi-psi-unayoe/detalle-pefi-psi-unayoe.component';
import Swal from "sweetalert2";

@Component({
  selector: 'app-perfi-psi-no-culmi-unayoe',
  templateUrl: './perfi-psi-no-culmi-unayoe.component.html',
  styleUrls: ['./perfi-psi-no-culmi-unayoe.component.css']
})
export class PerfiPsiNoCulmiUnayoeComponent implements OnInit {

  //Variables
  displayedColumns: string[] = ['codigo', 'apellidosNombres', 'escuela', 'situacion','acciones'];
  banderaContenido = false;
  enviarMesAnho: SendAnhoMesPNCUnayoeModel = {anho: '', mes: ''};
  date = new Date();
  arrayGetListPNCUnayoe: GetListPNCUnayoeModel[];
  getListPNCUnayoe: GetListPNCUnayoeModel;
  getArrayPerfilesUnayoe:PerfilesListPNCUnayoeModel[];
  dataSource = new MatTableDataSource();

  situacion = '';
  colorSituacion = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.dataSource.paginator = this.paginator;
  }
  //Constructor
  constructor(public dialog: MatDialog,
              private perfNoCulmPsiUnayoeService: PerfNoCulmPsiUnayoeService) { }

  ngOnInit() {
    this.getListTotal();
    this.dataSource.paginator = this.paginator;
  }

  //Métodos
  getListTotal(){
    this.getEnviarMesAnho();
    this.getListPerfPendPsi();
  }

  getEnviarMesAnho() {
    this.enviarMesAnho.anho = this.date.getFullYear().toString();
    this.enviarMesAnho.mes = (this.date.getMonth() + 1).toString();
  }
  getListPerfPendPsi() {
    console.log(this.enviarMesAnho);
    this.perfNoCulmPsiUnayoeService.getEnviarMesAnho(this.enviarMesAnho).subscribe(
        (res: GetListPNCUnayoeModel) => {
          this.arrayGetListPNCUnayoe = res['data'];
          this.getListPNCUnayoe = this.arrayGetListPNCUnayoe[0];
          this.getArrayPerfilesUnayoe = this.getListPNCUnayoe.perfiles;
          this.dataSource = new MatTableDataSource(this.getArrayPerfilesUnayoe);
          // this.getDateFormat();
          if(this.getListPNCUnayoe.perfiles.length==0){
            this.banderaContenido= false;
          }else{
            this.banderaContenido= true;
          }
        },
        error => {
          console.log("Error al extraer la lista de perfiles psicológicos.")
          console.log(error)
        }
    );
  }

  openDialogPerfil(id_perfil_psico: number) {
    const dialogConfig = new MatDialogConfig();
    // console.log(id_perfil_psico);
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

  finalizarPerfilPsicologicos(id_perfil_psico: number) {
    Swal.fire({
      title: '¿Estás seguro de Finalizar el Perfil Psicológico?',
      type: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#5867dd',
      cancelButtonColor: '#fd397a',
      confirmButtonText: 'Sí, salir!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        console.log("entro");
        this.perfNoCulmPsiUnayoeService.finalizarPerfilPsicologico(id_perfil_psico.toString()).subscribe(
            res => {
              Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Finalizdo correctamente.',
                showConfirmButton: false,
                confirmButtonColor: '#5867dd',
                timer: 1500
              });
              console.log("Finalizado");
              this.getListTotal();
            },
            error => {
              console.log(error);
            }
        );
        console.log("salio");
      }
    });

  }
}

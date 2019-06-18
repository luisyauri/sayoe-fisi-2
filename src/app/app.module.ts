import {JwtModule} from '@auth0/angular-jwt';

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './views/authentication/login/login.component';
import {UnayoeComponent} from './views/unayoe/unayoe.component';
import {AlumnoComponent} from './views/alumno/alumno.component';
import {InicioUnayoeComponent} from './views/unayoe/inicio-unayoe/inicio-unayoe.component';
import {InicioAlumnoComponent} from './views/alumno/inicio-alumno/inicio-alumno.component';
import {MiPerfilUnayoeComponent} from './views/unayoe/mi-perfil-unayoe/mi-perfil-unayoe.component';
import {AlumnosUnayoeComponent} from './views/unayoe/alumnos-unayoe/alumnos-unayoe.component';
import {EstadisticasUnayoeComponent} from './views/unayoe/estadisticas-unayoe/estadisticas-unayoe.component';
import {CitasUnayoeComponent} from './views/unayoe/citas-unayoe/citas-unayoe.component';
import {EvalPsiUnayoeComponent} from './views/unayoe/eval-psi-unayoe/eval-psi-unayoe.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AuthService} from './services/auth.service';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule} from '@angular/material';
import {UnayoeGuard} from './services/unayoe.guard';
import {AlumnoGuard} from './services/alumno.guard';
import {RedireccionComponent} from './views/authentication/redireccion/redireccion/redireccion.component';
import {EvalPsiUnayoeDialogComponent} from './views/unayoe/eval-psi-unayoe/eval-psi-unayoe-dialog/eval-psi-unayoe-dialog.component';
import {EvalPsiUnayoeService} from './services/unayoe/eval-psi-unayoe.service';
import {EvalPsiUnayoeListComponent} from './views/unayoe/eval-psi-unayoe/eval-psi-unayoe-list/eval-psi-unayoe-list.component';
import {MiPerfilDialogComponent} from './views/unayoe/mi-perfil-unayoe/mi-perfil-dialog/mi-perfil-dialog.component';
import {AdministradorComponent} from './views/administrador/administrador.component';

import {
    MatTableModule,
    MatPaginatorModule,
} from '@angular/material';
import {AgregarDialogComponent} from './views/administrador/agregar-dialog/agregar-dialog.component';
import {AdministradorService} from './services/administrador/administrador.service';
import {UnayoeService} from './services/unayoe/unayoe.service';
import {MiPerfilUnayoeService} from './services/unayoe/mi-perfil-unayoe.service';
import {MatDatepickerModule, MatNativeDateModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {CdkTableModule} from '@angular/cdk/table';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import { MiPerfilAlumnoComponent } from './views/alumno/mi-perfil-alumno/mi-perfil-alumno.component';
import { EvalPsiPendAlumnoComponent } from './views/alumno/eval-psi-pend-alumno/eval-psi-pend-alumno.component';
import { EvalPsiRealAlumnoComponent } from './views/alumno/eval-psi-real-alumno/eval-psi-real-alumno.component';
import { PerfilPsiAlumnoComponent } from './views/alumno/perfil-psi-alumno/perfil-psi-alumno.component';
import { CitasAlumnoComponent } from './views/alumno/citas-alumno/citas-alumno.component';
import {MAT_DATE_LOCALE} from '@angular/material';import { EPPDAlumnoComponent } from './views/alumno/eval-psi-pend-alumno/e-p-p-d-alumno/e-p-p-d-alumno.component';
import { PerfiPsiPendUnayoeComponent } from './views/unayoe/perfi-psi-pend-unayoe/perfi-psi-pend-unayoe.component';
import { PerfiPsiRealUnayoeComponent } from './views/unayoe/perfi-psi-real-unayoe/perfi-psi-real-unayoe.component';
import { PerfiPsiNoCulmiUnayoeComponent } from './views/unayoe/perfi-psi-no-culmi-unayoe/perfi-psi-no-culmi-unayoe.component';
import { PerfiPsiPendUnayoeDialogComponent } from './views/unayoe/perfi-psi-pend-unayoe/perfi-psi-pend-unayoe-dialog/perfi-psi-pend-unayoe-dialog.component';

import { GoogleChartsModule } from 'angular-google-charts';
import { TestComponent } from './views/test/test.component';
import { AgregarAlumnoUnayoeComponent } from './views/unayoe/alumnos-unayoe/agregar-alumno-unayoe/agregar-alumno-unayoe.component';
import { PerfiPsiRealUnayoeDialogComponent } from './views/unayoe/perfi-psi-real-unayoe/perfi-psi-real-unayoe-dialog/perfi-psi-real-unayoe-dialog.component';
import { PerfilAlumnoUnayoeComponent } from './views/unayoe/alumnos-unayoe/perfil-alumno-unayoe/perfil-alumno-unayoe.component';
import { CitasUnayoeDialogComponent } from './views/unayoe/citas-unayoe/citas-unayoe-dialog/citas-unayoe-dialog.component';
import {AmazingTimePickerModule} from 'amazing-time-picker';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import { EstadoUnayoeDialogComponent } from './views/unayoe/citas-unayoe/estado-unayoe-dialog/estado-unayoe-dialog.component';
import { VerUnayoeDialogComponent } from './views/unayoe/citas-unayoe/ver-unayoe-dialog/ver-unayoe-dialog.component';

export function tokenGetter() {
    return localStorage.getItem('access_token');
}

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        UnayoeComponent,
        AlumnoComponent,
        InicioUnayoeComponent,
        InicioAlumnoComponent,
        MiPerfilUnayoeComponent,
        AlumnosUnayoeComponent,
        EstadisticasUnayoeComponent,
        CitasUnayoeComponent,
        EvalPsiUnayoeComponent,
        RedireccionComponent,
        EvalPsiUnayoeDialogComponent,
        EvalPsiUnayoeListComponent,
        MiPerfilDialogComponent,
        AdministradorComponent,
        AgregarDialogComponent,
        MiPerfilAlumnoComponent,
        EvalPsiPendAlumnoComponent,
        EvalPsiRealAlumnoComponent,
        PerfilPsiAlumnoComponent,
        CitasAlumnoComponent,
        EPPDAlumnoComponent,
        PerfiPsiPendUnayoeComponent,
        PerfiPsiRealUnayoeComponent,
        PerfiPsiNoCulmiUnayoeComponent,
        PerfiPsiPendUnayoeDialogComponent,
        TestComponent,
        AgregarAlumnoUnayoeComponent,
        PerfiPsiRealUnayoeDialogComponent,
        PerfilAlumnoUnayoeComponent,
        CitasUnayoeDialogComponent,
        EstadoUnayoeDialogComponent,
        VerUnayoeDialogComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        JwtModule.forRoot({
            config: {
                tokenGetter,
                whitelistedDomains: [''],
                blacklistedRoutes: ['']
            }
        }),
        [BrowserAnimationsModule],
        MaterialModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatTableModule,
        MatPaginatorModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        [SweetAlert2Module.forRoot()],
        GoogleChartsModule.forRoot(),
        OwlDateTimeModule ,
        OwlNativeDateTimeModule ,
    ],
    providers: [AuthService, UnayoeGuard, AlumnoGuard,
        EvalPsiUnayoeService, AdministradorService,
        UnayoeService, MiPerfilUnayoeService,
        { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }],
    bootstrap: [AppComponent],
    entryComponents: [EvalPsiUnayoeDialogComponent, EvalPsiUnayoeListComponent,
        MiPerfilDialogComponent, AgregarDialogComponent, AlumnosUnayoeComponent,
        PerfiPsiPendUnayoeDialogComponent,AgregarAlumnoUnayoeComponent,
        AgregarAlumnoUnayoeComponent,CitasUnayoeDialogComponent,EstadoUnayoeDialogComponent,
        VerUnayoeDialogComponent

    ]
})
export class AppModule {
}

export class PizzaPartyAppModule {
}



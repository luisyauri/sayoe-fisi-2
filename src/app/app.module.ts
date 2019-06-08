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
    ],
    providers: [AuthService, UnayoeGuard, AlumnoGuard,
        EvalPsiUnayoeService, AdministradorService,
        UnayoeService, MiPerfilUnayoeService,
        { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }],
    bootstrap: [AppComponent],
    entryComponents: [EvalPsiUnayoeDialogComponent, EvalPsiUnayoeListComponent,
        MiPerfilDialogComponent, AgregarDialogComponent, AlumnosUnayoeComponent,
    ]
})
export class AppModule {
}

export class PizzaPartyAppModule {
}



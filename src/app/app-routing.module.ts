import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './views/authentication/login/login.component';
import {UnayoeComponent} from './views/unayoe/unayoe.component';
import {InicioUnayoeComponent} from './views/unayoe/inicio-unayoe/inicio-unayoe.component';
import {MiPerfilUnayoeComponent} from './views/unayoe/mi-perfil-unayoe/mi-perfil-unayoe.component';
import {AlumnosUnayoeComponent} from './views/unayoe/alumnos-unayoe/alumnos-unayoe.component';
import {CitasUnayoeComponent} from './views/unayoe/citas-unayoe/citas-unayoe.component';
import {EstadisticasUnayoeComponent} from './views/unayoe/estadisticas-unayoe/estadisticas-unayoe.component';
import {EvalPsiUnayoeComponent} from './views/unayoe/eval-psi-unayoe/eval-psi-unayoe.component';

import {AlumnoComponent} from './views/alumno/alumno.component';
import {UnayoeGuard} from './services/unayoe.guard';
import {AlumnoGuard} from './services/alumno.guard';
import {InicioAlumnoComponent} from './views/alumno/inicio-alumno/inicio-alumno.component';
import {RedireccionComponent} from './views/authentication/redireccion/redireccion/redireccion.component';
import {AdministradorComponent} from './views/administrador/administrador.component';
import {MiPerfilAlumnoComponent} from './views/alumno/mi-perfil-alumno/mi-perfil-alumno.component';
import {EvalPsiPendAlumnoComponent} from './views/alumno/eval-psi-pend-alumno/eval-psi-pend-alumno.component';
import {EvalPsiRealAlumnoComponent} from './views/alumno/eval-psi-real-alumno/eval-psi-real-alumno.component';
import {PerfilPsiAlumnoComponent} from './views/alumno/perfil-psi-alumno/perfil-psi-alumno.component';
import {CitasAlumnoComponent} from './views/alumno/citas-alumno/citas-alumno.component';
import {EPPDAlumnoComponent} from './views/alumno/eval-psi-pend-alumno/e-p-p-d-alumno/e-p-p-d-alumno.component';
import {PerfiPsiPendUnayoeComponent} from './views/unayoe/perfi-psi-pend-unayoe/perfi-psi-pend-unayoe.component';
import {PerfiPsiRealUnayoeComponent} from './views/unayoe/perfi-psi-real-unayoe/perfi-psi-real-unayoe.component';
import {PerfiPsiNoCulmiUnayoeComponent} from './views/unayoe/perfi-psi-no-culmi-unayoe/perfi-psi-no-culmi-unayoe.component';
import {TestComponent} from './views/test/test.component';
import {PerfilAlumnoUnayoeComponent} from './views/unayoe/alumnos-unayoe/perfil-alumno-unayoe/perfil-alumno-unayoe.component';

const routes: Routes = [
    {path: '', component: LoginComponent,},
    {path: 'redirec', component: RedireccionComponent,},
    {
        path: 'unayoe', component: UnayoeComponent, canActivate: [UnayoeGuard],
        children: [
            {path: 'inicio', component: InicioUnayoeComponent,},
            {path: 'mi-perfil', component: MiPerfilUnayoeComponent,},
            {path: 'perfiles-psicologicos-pendientes',component: PerfiPsiPendUnayoeComponent,},
            {path: 'perfiles-psicologicos-realizados',component: PerfiPsiRealUnayoeComponent,},
            {path: 'perfiles-psicologicos-no-culminados',component: PerfiPsiNoCulmiUnayoeComponent,},
            {path: 'evaluaciones-psicologicas', component: EvalPsiUnayoeComponent,},
            {path: 'alumnos', component: AlumnosUnayoeComponent,},
            {path: 'citas', component: CitasUnayoeComponent,},
            {path: 'estadisticas', component: EstadisticasUnayoeComponent,},
            {path: 'perfil-alumno',component:PerfilAlumnoUnayoeComponent,}
        ]
    },
    {
        path: 'alumno', component: AlumnoComponent,
        children: [
            {path: 'inicio', component: InicioAlumnoComponent,},
            {path: 'mi-perfil', component: MiPerfilAlumnoComponent,},
            {path: 'evaluaciones-psicologicas-pendientes', component: EvalPsiPendAlumnoComponent,},
            {path: 'evaluaciones-psicologicas-realizadas', component: EvalPsiRealAlumnoComponent,},
            {path: 'perfil-psicologico', component: PerfilPsiAlumnoComponent,},
            {path: 'citas', component: CitasAlumnoComponent,},
            {path: 'evaluacion-psicologica', component: EPPDAlumnoComponent}
        ]
    },
    {
        path: 'administrador', component: AdministradorComponent ,
    },
    {path:'test', component: TestComponent},
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}


// {
//     path: 'alumno', component: AlumnoComponent, canActivate: [AlumnoGuard],
//     children: [
//     {path: 'inicio', component: InicioAlumnoComponent,}
// ]
// },

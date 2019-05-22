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

const routes: Routes = [
    {path: '', component: LoginComponent,},
    {path: 'redirec', component: RedireccionComponent,},
    {
        path: 'unayoe', component: UnayoeComponent, canActivate: [UnayoeGuard],
        children: [
            {path: 'inicio', component: InicioUnayoeComponent,},
            {path: 'mi-perfil', component: MiPerfilUnayoeComponent,},
            {path: 'evaluaciones-psicologicas', component: EvalPsiUnayoeComponent,},
            {path: 'alumnos', component: AlumnosUnayoeComponent,},
            {path: 'citas', component: CitasUnayoeComponent,},
            {path: 'estadisticas', component: EstadisticasUnayoeComponent,}
        ]
    },
    {
        path: 'alumno', component: AlumnoComponent, canActivate: [AlumnoGuard],
        children: [
            {path: 'inicio', component: InicioAlumnoComponent,}
        ]
    },
    {
        path: 'administrador', component: AdministradorComponent ,
    },
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

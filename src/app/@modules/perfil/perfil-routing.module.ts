import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilComponent } from './perfil.component';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

const routes: Routes = [
    {
        path: '',
        component: PerfilComponent,
        data: { title: marker('Meu Perfil'), subtitle: marker('Perfil') },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PerfilRoutingModule {}

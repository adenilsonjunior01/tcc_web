import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroComponent } from './cadastro.component';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { DetalheColaboradorComponent } from './pages/detalhe-colaborador/detalhe-colaborador.component';

const routes: Routes = [
    {
        path: 'colaboradores',
        component: CadastroComponent,
        data: { title: marker('Colaborador'), subtitle: marker('Cadastro de usuários') },
    },
    {
        path: 'colaborador/detalhes',
        component: DetalheColaboradorComponent,
        data: { title: marker('Detalhes Colaborador'), subtitle: marker('Detalhes Colaborador') },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CadastroRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroComponent } from './cadastro.component';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { EspecialidadesComponent } from './pages/especialidades/especialidades.component';

const routes: Routes = [
  {
    path: 'colaboradores',
    component: CadastroComponent,
    data: { title: marker('Colaborador'), subtitle: marker('Cadastro de usuários')}
  },
  {
    path: 'especialidades',
    component: EspecialidadesComponent,
    data: { title: marker('Cadastro Especialidades'), subtitle: marker('Cadastro')}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroRoutingModule { }

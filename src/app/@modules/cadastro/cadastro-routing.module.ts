import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroComponent } from './cadastro.component';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { FuncionarioComponent } from './pages/funcionario/funcionario.component';
import { MedicoComponent } from './pages/medico/medico.component';

const routes: Routes = [
  {
    path: '',
    component: CadastroComponent,
    data: { title: marker('Colaborador'), subtitle: marker('Cadastro de usuários')}
  },
  {
    path: 'funcionario',
    component: FuncionarioComponent,
    data: { title: marker('Colaborador'), subtitle: marker('Cadastro de colaborador')}
  },
  {
    path: 'medico',
    component: MedicoComponent,
    data: { title: marker('Médico'), subtitle: marker('Cadastro de médico')}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroRoutingModule { }

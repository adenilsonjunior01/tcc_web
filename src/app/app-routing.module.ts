import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

//  router-outlet principal
const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'about',
      loadChildren: () => import('./about/about.module').then((m) => m.AboutModule),
    },
    {
      path: 'pacientes',
      loadChildren: () => import('./@modules/paciente/paciente.module').then((m) => m.PacienteModule),
      data: { title: marker('Pacientes'), subtitle: marker('Lista de pacientes') },
    },
    {
      path: 'cadastro',
      loadChildren: () => import('./@modules/cadastro/cadastro.module').then((m) => m.CadastroModule),
      data: { title: marker('Cadastro'), subtitle: marker('Cadastro de Usuários') },
    },
    {
      path: 'configuracoes',
      loadChildren: () => import('./@modules/configuracoes/configuracoes.module').then((m) => m.ConfiguracoesModule),
      data: { title: marker('Configurações'), subtitle: marker('Configurações') },
    },
  ]),
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}

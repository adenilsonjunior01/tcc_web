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
    {
      path: 'perfil',
      loadChildren: () => import('./@modules/perfil/perfil.module').then((m) => m.PerfilModule),
      data: { title: marker('Meu Perfil'), subtitle: marker('Perfil') },
    },
    {
      path: 'prontuario',
      loadChildren: () =>
        import('./@modules/protuario-medico/protuario-medico.module').then((m) => m.ProtuarioMedicoModule),
      data: { title: marker('Prontuário Médico'), subtitle: marker('Prontuário') },
    },
    {
      path: 'medicos',
      loadChildren: () => import('./@modules/medicos/medicos.module').then((m) => m.MedicosModule),
      data: { title: marker('Listagem de Médicos'), subtitle: marker('Médicos') },
    },
    {
      path: 'consultas',
      loadChildren: () => import('./@modules/consultas/consultas.module').then((m) => m.ConsultasModule),
      data: { title: marker('Consultas'), subtitle: marker('Consultas') },
    },
    {
      path: 'especialidades',
      loadChildren: () => import('./@modules/especialidades/especialidades.module').then((m) => m.EspecialidadesModule),
      data: { title: marker('Especialidades'), subtitle: marker('Especialidades') },
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

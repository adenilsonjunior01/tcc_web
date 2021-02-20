import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PacienteComponent } from './paciente.component';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { DetalhesPacienteComponent } from './components/detalhes-paciente/detalhes-paciente.component';

const routes: Routes = [
  {
    path: '',
    component: PacienteComponent,
    data: { title: marker('Pacientes'), subtitle: marker('Lista de Pacientes')}
  },
  {
    path: 'detalhes',
    component: DetalhesPacienteComponent,
    data: { title: marker('Detalhes Paciente'), subtitle: marker('Detalhes')}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }

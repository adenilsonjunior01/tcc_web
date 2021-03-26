import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { ProtuarioMedicoComponent } from './protuario-medico.component';

const routes: Routes = [
  {
    path: '',
    component: ProtuarioMedicoComponent,
    data: { title: marker('Meus Prontuários'), subtitle: marker('Prontuário') },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProtuarioMedicoRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MedicosComponent } from './medicos.component';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

const routes: Routes = [
  {
    path: '',
    component: MedicosComponent,
    data: { title: marker('Listagem de Médicos'), subtitle: marker('Médicos') },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicosRoutingModule {}

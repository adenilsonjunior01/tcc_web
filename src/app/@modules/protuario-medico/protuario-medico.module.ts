import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtuarioMedicoRoutingModule } from './protuario-medico-routing.module';
import { ProtuarioMedicoComponent } from './protuario-medico.component';
import { SharedModule } from '../../@shared/shared.module';
import { MaterialModule } from '@app/material.module';
import { TableProntuariosComponent } from './components/table-prontuarios/table-prontuarios.component';

@NgModule({
  declarations: [ProtuarioMedicoComponent, TableProntuariosComponent],
  imports: [CommonModule, ProtuarioMedicoRoutingModule, SharedModule, MaterialModule],
})
export class ProtuarioMedicoModule {}

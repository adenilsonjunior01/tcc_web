import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtuarioMedicoRoutingModule } from './protuario-medico-routing.module';
import { ProtuarioMedicoComponent } from './protuario-medico.component';
import { SharedModule } from '../../@shared/shared.module';
import { MaterialModule } from '@app/material.module';
import { TableProntuariosComponent } from './components/table-prontuarios/table-prontuarios.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DetalhesProntuarioComponent } from './components/detalhes-prontuario/detalhes-prontuario.component';

@NgModule({
    declarations: [ProtuarioMedicoComponent, TableProntuariosComponent, DetalhesProntuarioComponent],
    imports: [CommonModule, ProtuarioMedicoRoutingModule, SharedModule, MaterialModule, NgxPaginationModule],
})
export class ProtuarioMedicoModule {}

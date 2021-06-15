import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultasRoutingModule } from './consultas-routing.module';
import { ConsultasComponent } from './consultas.component';
import { SharedModule } from '../../@shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from '@app/material.module';
import { ComponentsModule } from '../../components/components.module';
import { ListaMedicoComponent } from './lista-medico/lista-medico.component';
import { ListaPacienteComponent } from './lista-paciente/lista-paciente.component';

@NgModule({
    declarations: [ConsultasComponent, ListaMedicoComponent, ListaPacienteComponent],
    imports: [
        CommonModule,
        ConsultasRoutingModule,
        SharedModule,
        NgxMaskModule,
        NgxPaginationModule,
        MaterialModule,
        ComponentsModule,
    ],
})
export class ConsultasModule {}

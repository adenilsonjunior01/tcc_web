import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacienteRoutingModule } from './paciente-routing.module';
import { PacienteComponent } from './paciente.component';
import { SharedModule } from '../../@shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../material.module';
import { TableMedicoComponent } from './components/table-medico/table-medico.component';
import { ConsultaMedicaComponent } from './components/consulta-medica/consulta-medica.component';
import { DetalhesPacienteComponent } from './components/detalhes-paciente/detalhes-paciente.component';
import { TablePacientesComponent } from './components/table-pacientes/table-pacientes.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProntuarioMedicoPacienteComponent } from './components/prontuario-medico-paciente/prontuario-medico-paciente.component';
import { FormNovoPacienteComponent } from './components/form-novo-paciente/form-novo-paciente.component';
import { NgxMaskModule } from 'ngx-mask';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    PacienteComponent,
    TablePacientesComponent,
    TableMedicoComponent,
    ConsultaMedicaComponent,
    DetalhesPacienteComponent,
    ProntuarioMedicoPacienteComponent,
    FormNovoPacienteComponent,
  ],
  imports: [
    CommonModule,
    PacienteRoutingModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    NgSelectModule,
    NgxMaskModule,
    NgxPaginationModule,
    NgxMaskModule,
  ],
  exports: [ConsultaMedicaComponent],
})
export class PacienteModule {}

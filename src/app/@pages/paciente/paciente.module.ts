import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacienteRoutingModule } from './paciente-routing.module';
import { PacienteComponent } from './paciente.component';
import { SharedModule } from '../../@shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../material.module';
import { TableFuncionarioComponent } from './components/table-funcionario/table-funcionario.component';
import { TableMedicoComponent } from './components/table-medico/table-medico.component';
import { ConsultaMedicaComponent } from './components/consulta-medica/consulta-medica.component';


@NgModule({
  declarations: [PacienteComponent, TableFuncionarioComponent, TableMedicoComponent, ConsultaMedicaComponent],
  imports: [
    CommonModule,
    PacienteRoutingModule,
    CommonModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule
  ]
})
export class PacienteModule { }

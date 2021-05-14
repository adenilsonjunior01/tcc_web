import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspecialidadesRoutingModule } from './especialidades-routing.module';
import { EspecialidadesComponent } from './especialidades.component';
import { FormCadastroEspecialidadeComponent } from './components/form-cadastro-especialidade/form-cadastro-especialidade.component';
import { TableEspecialidadesComponent } from './components/table-especialidades/table-especialidades.component';
import { MaterialModule } from '../../material.module';
import { SharedModule } from '../../@shared/shared.module';

@NgModule({
  declarations: [EspecialidadesComponent, TableEspecialidadesComponent, FormCadastroEspecialidadeComponent],
  imports: [CommonModule, EspecialidadesRoutingModule, SharedModule, MaterialModule],
})
export class EspecialidadesModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilComponent } from './perfil.component';
import { FormUpdateMedicoComponent } from './components/form-update-medico/form-update-medico.component';
import { FormUpdatePacienteComponent } from './components/form-update-paciente/form-update-paciente.component';
import { SharedModule } from '../../@shared/shared.module';
import { MaterialModule } from '../../material.module';
import { NgxMaskModule } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [PerfilComponent, FormUpdateMedicoComponent, FormUpdatePacienteComponent],
  imports: [CommonModule, PerfilRoutingModule, SharedModule, MaterialModule, NgxMaskModule, NgSelectModule],
})
export class PerfilModule {}

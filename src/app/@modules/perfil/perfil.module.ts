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
import { FormUserComponent } from './components/form-user/form-user.component';
import { UpdateDadosMedicosComponent } from './components/update-dados-medicos/update-dados-medicos.component';
import { TabPerfilComponent } from './components/tab-perfil/tab-perfil.component';
import { TabSenhaComponent } from './components/tab-senha/tab-senha.component';
import { FormUpdateAuxAdmComponent } from './components/form-update-aux-adm/form-update-aux-adm.component';

@NgModule({
    declarations: [
        PerfilComponent,
        FormUpdateMedicoComponent,
        FormUpdatePacienteComponent,
        FormUserComponent,
        UpdateDadosMedicosComponent,
        TabPerfilComponent,
        TabSenhaComponent,
        FormUpdateAuxAdmComponent,
    ],
    imports: [CommonModule, PerfilRoutingModule, SharedModule, MaterialModule, NgxMaskModule, NgSelectModule],
})
export class PerfilModule {}

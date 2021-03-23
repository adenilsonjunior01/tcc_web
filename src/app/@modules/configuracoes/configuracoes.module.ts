import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguracoesRoutingModule } from './configuracoes-routing.module';
import { ConfiguracoesComponent } from './configuracoes.component';
import { SharedModule } from '../../@shared/shared.module';
import { FormDadosClinicaComponent } from './components/form-dados-clinica/form-dados-clinica.component';
import { MaterialModule } from '../../material.module';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [ConfiguracoesComponent, FormDadosClinicaComponent],
  imports: [
    CommonModule,
    ConfiguracoesRoutingModule,
    SharedModule,
    MaterialModule,
    FileUploadModule,
    NgSelectModule,
    NgxMaskModule,
  ],
})
export class ConfiguracoesModule {}

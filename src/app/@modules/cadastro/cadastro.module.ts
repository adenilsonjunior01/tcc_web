import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroRoutingModule } from './cadastro-routing.module';
import { CadastroComponent } from './cadastro.component';
import { SharedModule } from '@app/@shared';
import { MaterialModule } from '../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { CadastroColaboradorComponent } from './components/colaboradores/cadastro-colaborador/cadastro-colaborador.component';
import { FormCadastroColaboradorComponent } from './components/colaboradores/form-cadastro-colaborador/form-cadastro-colaborador.component';
import { TableColaboradoresComponent } from './components/colaboradores/table-colaboradores/table-colaboradores.component';
import { EspecialidadesComponent } from './pages/especialidades/especialidades.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    CadastroComponent,
    TableColaboradoresComponent,
    CadastroColaboradorComponent,
    FormCadastroColaboradorComponent,
    EspecialidadesComponent
  ],
  imports: [
    CommonModule,
    CadastroRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    NgxMaskModule.forRoot(),
  ]
})
export class CadastroModule { }

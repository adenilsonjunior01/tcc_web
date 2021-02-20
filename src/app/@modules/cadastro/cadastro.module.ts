import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroRoutingModule } from './cadastro-routing.module';
import { CadastroComponent } from './cadastro.component';
import { FuncionarioComponent } from './pages/funcionario/funcionario.component';
import { MedicoComponent } from './pages/medico/medico.component';
import { SharedModule } from '@app/@shared';
import { MaterialModule } from '../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormCadastroFuncionarioComponent } from './components/form-cadastro-funcionario/form-cadastro-funcionario.component';
import { NgxMaskModule, IConfig } from 'ngx-mask'

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [CadastroComponent, FuncionarioComponent, MedicoComponent, FormCadastroFuncionarioComponent],
  imports: [
    CommonModule,
    CadastroRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    NgxMaskModule.forRoot()
  ]
})
export class CadastroModule { }

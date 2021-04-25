import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDadosBasicosUsuarioComponent } from './form-dados-basicos-usuario/form-dados-basicos-usuario.component';
import { FormDadosBasicosMedicoComponent } from './form-dados-basicos-medico/form-dados-basicos-medico.component';
import { SharedModule } from '../@shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';
import { MaterialModule } from '../material.module';
import { DetalhesConsultaComponent } from './detalhes-consulta/detalhes-consulta.component';

@NgModule({
  declarations: [FormDadosBasicosMedicoComponent, FormDadosBasicosUsuarioComponent, DetalhesConsultaComponent],
  exports: [FormDadosBasicosMedicoComponent, FormDadosBasicosUsuarioComponent, DetalhesConsultaComponent],
  imports: [CommonModule, SharedModule, NgxMaskModule, MaterialModule],
})
export class ComponentsModule {}

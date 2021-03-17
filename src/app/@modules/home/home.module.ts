import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '@shared';
import { MaterialModule } from '@app/material.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TableConsultasHomeComponent } from './components/table-consultas-home/table-consultas-home.component';
import { EstatisticasGeraisComponent } from './components/estatisticas-gerais/estatisticas-gerais.component';
import { IdentificacaoProfissionalComponent } from './components/identificacao-profissional/identificacao-profissional.component';
import { DadosGeraisMedicoComponent } from './components/dados-gerais-medico/dados-gerais-medico.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { EstatisticasMedicoComponent } from './components/charts/estatisticas-medico/estatisticas-medico.component';
import { DadosGeraisClinicaComponent } from './components/charts/dados-gerais-clinica/dados-gerais-clinica.component';
import { QuantitativoDadosClinicaComponent } from './components/quantitativo-dados-clinica/quantitativo-dados-clinica.component';
import { CardNovaConsultaComponent } from './components/card-nova-consulta/card-nova-consulta.component';
import { PacienteModule } from '../paciente/paciente.module';
import { CardNovoPacienteComponent } from './components/card-novo-paciente/card-novo-paciente.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { AgendamentoConsultaComponent } from './components/card-nova-consulta/agendamento-consulta/agendamento-consulta.component';
import { FormPreCadastroPacienteComponent } from './components/card-nova-consulta/form-pre-cadastro-paciente/form-pre-cadastro-paciente.component';
import { DetalhesPacienteHomeComponent } from './components/card-nova-consulta/detalhes-paciente-home/detalhes-paciente-home.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    HomeRoutingModule,
    NgApexchartsModule,
    PacienteModule,
    NgxMaskModule.forRoot(),
  ],
  declarations: [
    HomeComponent,
    TableConsultasHomeComponent,
    EstatisticasGeraisComponent,
    IdentificacaoProfissionalComponent,
    DadosGeraisMedicoComponent,
    EstatisticasMedicoComponent,
    DadosGeraisClinicaComponent,
    QuantitativoDadosClinicaComponent,
    CardNovaConsultaComponent,
    CardNovoPacienteComponent,
    AgendamentoConsultaComponent,
    FormPreCadastroPacienteComponent,
    DetalhesPacienteHomeComponent,
  ],
  exports: [CardNovaConsultaComponent, AgendamentoConsultaComponent, FormPreCadastroPacienteComponent],
})
export class HomeModule {}

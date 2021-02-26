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

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    HomeRoutingModule,
    NgApexchartsModule,
    PacienteModule
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
    CardNovaConsultaComponent
  ],
})
export class HomeModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '@shared';
import { MaterialModule } from '@app/material.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TablePacientesHomeComponent } from './components/table-pacientes-home/table-pacientes-home.component';
import { EstatisticasGeraisComponent } from './components/estatisticas-gerais/estatisticas-gerais.component';
import { IdentificacaoProfissionalComponent } from './components/identificacao-profissional/identificacao-profissional.component';
import { DadosGeraisMedicoComponent } from './components/dados-gerais-medico/dados-gerais-medico.component';
import { ChartsEstatisticasMedicoComponent } from './components/charts-estatisticas-medico/charts-estatisticas-medico.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    HomeRoutingModule,
    NgApexchartsModule
  ],
  declarations: [
    HomeComponent,
    TablePacientesHomeComponent,
    EstatisticasGeraisComponent,
    IdentificacaoProfissionalComponent,
    DadosGeraisMedicoComponent,
    ChartsEstatisticasMedicoComponent
  ],
})
export class HomeModule {}

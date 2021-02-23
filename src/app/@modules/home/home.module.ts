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

@NgModule({
  imports: [CommonModule, TranslateModule, SharedModule, FlexLayoutModule, MaterialModule, HomeRoutingModule],
  declarations: [HomeComponent, TablePacientesHomeComponent, EstatisticasGeraisComponent],
})
export class HomeModule {}

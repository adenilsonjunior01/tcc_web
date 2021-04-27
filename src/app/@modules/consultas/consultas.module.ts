import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultasRoutingModule } from './consultas-routing.module';
import { ConsultasComponent } from './consultas.component';
import { SharedModule } from '../../@shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from '@app/material.module';

@NgModule({
  declarations: [ConsultasComponent],
  imports: [CommonModule, ConsultasRoutingModule, SharedModule, NgxMaskModule, NgxPaginationModule, MaterialModule],
})
export class ConsultasModule {}

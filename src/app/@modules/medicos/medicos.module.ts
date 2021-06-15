import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicosRoutingModule } from './medicos-routing.module';
import { MedicosComponent } from './medicos.component';
import { SharedModule } from '../../@shared/shared.module';
import { MaterialModule } from '../../material.module';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
    declarations: [MedicosComponent],
    imports: [CommonModule, MedicosRoutingModule, SharedModule, MaterialModule, NgxMaskModule],
})
export class MedicosModule {}

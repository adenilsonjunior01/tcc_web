import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { LoaderComponent } from './loader/loader.component';
import { ErrorControlMessageComponent } from './error-control-message/error-control-message.component';

@NgModule({
  imports: [FlexLayoutModule, MaterialModule, CommonModule],
  declarations: [LoaderComponent, ErrorControlMessageComponent],
  exports: [LoaderComponent, ErrorControlMessageComponent],
})
export class SharedModule {}

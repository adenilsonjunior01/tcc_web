import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { LoaderComponent } from './loader/loader.component';
import { ErrorControlMessageComponent } from './error-control-message/error-control-message.component';
import { CardContentComponent } from './card-content/card-content.component';

@NgModule({
  imports: [FlexLayoutModule, MaterialModule, CommonModule],
  declarations: [LoaderComponent, ErrorControlMessageComponent, CardContentComponent],
  exports: [LoaderComponent, ErrorControlMessageComponent, CardContentComponent],
})
export class SharedModule {}

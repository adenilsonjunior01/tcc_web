import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { LoaderComponent } from './loader/loader.component';
import { ErrorControlMessageComponent } from './error-control-message/error-control-message.component';
import { CardContentComponent } from './card-content/card-content.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [FlexLayoutModule, MaterialModule, CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [LoaderComponent, ErrorControlMessageComponent, CardContentComponent],
  exports: [LoaderComponent, ErrorControlMessageComponent, CardContentComponent, FormsModule, ReactiveFormsModule],
})
export class SharedModule {}

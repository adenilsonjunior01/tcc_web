import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { LoaderComponent } from './loader/loader.component';
import { ErrorControlMessageComponent } from './error-control-message/error-control-message.component';
import { CardContentComponent } from './card-content/card-content.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { ModalAnimationComponent } from './modal-animation/modal-animation.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

export function playerFactory() {
    return player;
}

@NgModule({
    imports: [
        FlexLayoutModule,
        MaterialModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        LottieModule.forRoot({ player: playerFactory }),
    ],
    declarations: [
        LoaderComponent,
        ErrorControlMessageComponent,
        CardContentComponent,
        FormDebugComponent,
        ModalAnimationComponent,
    ],
    exports: [
        LoaderComponent,
        ErrorControlMessageComponent,
        CardContentComponent,
        FormsModule,
        ReactiveFormsModule,
        FormDebugComponent,
        ModalAnimationComponent,
        LottieModule,
    ],
})
export class SharedModule {}

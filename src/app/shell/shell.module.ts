import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { I18nModule } from '@app/i18n';
import { MaterialModule } from '@app/material.module';
import { AuthModule } from '@app/auth';
import { ShellComponent } from './shell.component';
import { NavigationItem } from '../config/menu-navigation';
import { NavRigthComponent } from './nav-rigth/nav-rigth.component';
import { NotificationComponent } from './notification/notification.component';
import { SharedModule } from '../@shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';
import { ComponentsModule } from '../components/components.module';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        FlexLayoutModule,
        MaterialModule,
        AuthModule,
        I18nModule,
        RouterModule,
        SharedModule,
        NgSelectModule,
        NgxMaskModule,
        ComponentsModule,
    ],
    declarations: [ShellComponent, NavRigthComponent, NotificationComponent],
    providers: [NavigationItem],
})
export class ShellModule {}

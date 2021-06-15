import { NgModule } from '@angular/core';
import * as router from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { AboutComponent } from './about.component';

const routes: router.Routes = [
    // Module is lazy loaded, see app-routing.module.ts
    { path: '', component: AboutComponent, data: { title: marker('Temp') } },
];

@NgModule({
    imports: [router.RouterModule.forChild(routes)],
    exports: [router.RouterModule],
    providers: [],
})
export class AboutRoutingModule {}

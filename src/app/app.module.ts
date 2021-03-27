import { MedicosModule } from './@modules/medicos/medicos.module';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { environment } from '@env/environment';
import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { AuthModule } from '@app/auth';
import { HomeModule } from './@modules/home/home.module';
import { ShellModule } from './shell/shell.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PacienteModule } from './@modules/paciente/paciente.module';
import { CadastroModule } from './@modules/cadastro/cadastro.module';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { ConfiguracoesModule } from './@modules/configuracoes/configuracoes.module';
import { PerfilModule } from './@modules/perfil/perfil.module';
import { ProtuarioMedicoModule } from './@modules/protuario-medico/protuario-medico.module';

registerLocaleData(localePt);

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    CoreModule,
    SharedModule,
    ShellModule,
    HomeModule,
    AuthModule,
    AppRoutingModule,
    PacienteModule,
    CadastroModule,
    ConfiguracoesModule,
    PerfilModule,
    ProtuarioMedicoModule,
    MedicosModule, // must be imported as the last module as it contains the fallback route
  ],
  declarations: [AppComponent],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  bootstrap: [AppComponent],
})
export class AppModule {}

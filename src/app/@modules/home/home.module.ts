import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '@shared';
import { MaterialModule } from '@app/material.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TableConsultasHomeComponent } from './components/table-consultas-home/table-consultas-home.component';
import { IdentificacaoProfissionalComponent } from './components/identificacao-profissional/identificacao-profissional.component';
import { DadosGeraisMedicoComponent } from './components/dados-gerais-medico/dados-gerais-medico.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DadosGeraisClinicaComponent } from './components/charts/dados-gerais-clinica/dados-gerais-clinica.component';
import { QuantitativoDadosClinicaComponent } from './components/administrador/quantitativo-dados-clinica/quantitativo-dados-clinica.component';
import { CardNovaConsultaComponent } from './components/card-nova-consulta/card-nova-consulta.component';
import { PacienteModule } from '../paciente/paciente.module';
import { CardNovoPacienteComponent } from './components/card-novo-paciente/card-novo-paciente.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { AgendamentoConsultaComponent } from './components/card-nova-consulta/agendamento-consulta/agendamento-consulta.component';
import { FormPreCadastroPacienteComponent } from './components/card-nova-consulta/form-pre-cadastro-paciente/form-pre-cadastro-paciente.component';
import { DetalhesPacienteHomeComponent } from './components/card-nova-consulta/detalhes-paciente-home/detalhes-paciente-home.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ComponentsModule } from '../../components/components.module';
import { EstatisticasPacienteComponent } from './components/charts/estatisticas-paciente/estatisticas-paciente.component';
import { PieEspecialidadesPacienteComponent } from './components/charts/pie-especialidades-paciente/pie-especialidades-paciente.component';
import { NovaConsultaPacienteComponent } from './components/paciente/nova-consulta-paciente/nova-consulta-paciente.component';
import { BoxInfoPacienteComponent } from './components/paciente/box-info-paciente/box-info-paciente.component';
import { MinhasConsultasComponent } from './components/paciente/minhas-consultas/minhas-consultas.component';
import { TabelaMedicamentosComponent } from './components/paciente/tabela-medicamentos/tabela-medicamentos.component';
import { SemiDonoutProcedimentoComponent } from './components/charts/semi-donout-procedimento/semi-donout-procedimento.component';
import { TabelaDiagnosticosDataComponent } from './components/paciente/tabela-diagnosticos-data/tabela-diagnosticos-data.component';
import { QuantitativoUsuariosComponent } from './components/administrador/quantitativo-usuarios/quantitativo-usuarios.component';
import { PieEspecializacoesMesComponent } from './components/charts/pie-especializacoes-mes/pie-especializacoes-mes.component';
import { CardNovoColaboradorComponent } from './components/administrador/card-novo-colaborador/card-novo-colaborador.component';
import { BarPacientesMedicoComponent } from './components/charts/bar-pacientes-medico/bar-pacientes-medico.component';

const maskConfig: Partial<IConfig> = {
    validation: false,
};

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        SharedModule,
        FlexLayoutModule,
        MaterialModule,
        HomeRoutingModule,
        NgApexchartsModule,
        PacienteModule,
        NgxMaskModule.forRoot(),
        NgxPaginationModule,
        ComponentsModule,
    ],
    declarations: [
        HomeComponent,
        TableConsultasHomeComponent,
        IdentificacaoProfissionalComponent,
        DadosGeraisMedicoComponent,
        DadosGeraisClinicaComponent,
        QuantitativoDadosClinicaComponent,
        CardNovaConsultaComponent,
        CardNovoPacienteComponent,
        AgendamentoConsultaComponent,
        FormPreCadastroPacienteComponent,
        DetalhesPacienteHomeComponent,
        EstatisticasPacienteComponent,
        BoxInfoPacienteComponent,
        PieEspecialidadesPacienteComponent,
        NovaConsultaPacienteComponent,
        MinhasConsultasComponent,
        TabelaMedicamentosComponent,
        SemiDonoutProcedimentoComponent,
        TabelaDiagnosticosDataComponent,
        QuantitativoUsuariosComponent,
        PieEspecializacoesMesComponent,
        CardNovoColaboradorComponent,
        BarPacientesMedicoComponent,
    ],
    exports: [CardNovaConsultaComponent, AgendamentoConsultaComponent, FormPreCadastroPacienteComponent],
})
export class HomeModule {}

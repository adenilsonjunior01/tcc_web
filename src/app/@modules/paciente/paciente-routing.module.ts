import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PacienteComponent } from './paciente.component';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { DetalhesPacienteComponent } from './components/detalhes-paciente/detalhes-paciente.component';
import { ProntuarioMedicoPacienteComponent } from './components/prontuario-medico-paciente/prontuario-medico-paciente.component';
import { DadosMedicosPacienteComponent } from './components/dados-medicos-paciente/dados-medicos-paciente.component';

const routes: Routes = [
    {
        path: '',
        component: PacienteComponent,
        data: { title: marker('Pacientes'), subtitle: marker('Lista de Pacientes') },
    },
    {
        path: 'detalhes',
        component: DetalhesPacienteComponent,
        data: { title: marker('Detalhes Paciente'), subtitle: marker('Detalhes') },
    },
    {
        path: 'prontuario-paciente',
        component: ProntuarioMedicoPacienteComponent,
        data: { title: marker('Prontuário Médico'), subtitle: marker('') },
    },
    {
        path: 'dados-medicos',
        component: DadosMedicosPacienteComponent,
        data: { title: marker('Dados Médicos do Paciente'), subtitle: marker('') },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PacienteRoutingModule {}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ListaPacientesMock } from '../../../../mocks/lista-pacientes-mock';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { IConsultaModel, IConsultasModel } from '../../../../models/consultas-model';
import { FormControl } from '@angular/forms';
import { ListaTemporalidade } from '../../../home/mocks/lista-temporalidade';
import { untilDestroyed } from '../../../../@core/until-destroyed';
import { finalize } from 'rxjs/operators';
import { Logger } from '../../../../@core/logger.service';
import { CredentialsService, Token } from '../../../../auth/credentials.service';
import { ClinicaService } from '../../../../services/clinica/clinica.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AnimationOptions } from 'ngx-lottie';
import { IIniciarAtendimentoModel } from '../../../../models/iniciar-atendimento-model';
import { DadosPaciente } from '../../class/dados-paciente';

const log = new Logger('Pacientes Médico');

@Component({
    selector: 'app-table-medico',
    templateUrl: './table-medico.component.html',
    styleUrls: ['./table-medico.component.scss'],
})
export class TableMedicoComponent implements OnInit, OnDestroy {
    private readonly listaPacientesMock = new ListaPacientesMock();
    private readonly _dadosMedicos = new DadosPaciente();
    pacientes: any[];

    loading = false;
    itemsPerPage = 15;
    currentPage: number;
    totalItems: number;
    page = 0;
    perfil: string;
    idPerfil: number;

    public consultas: IConsultaModel[] = [];
    public temporalidadeControl = new FormControl();
    public opcoesTemporalidade: any[] = [];

    constructor(
        private readonly _router: Router,
        private readonly _clinicaService: ClinicaService,
        private readonly _credentials: CredentialsService
    ) {}

    public options: AnimationOptions = {
        path: '/assets/lottie/lottie-search.json',
    };

    ngOnDestroy(): void {}

    ngOnInit(): void {
        this.getPerfilUser();
        this.getIdPerfil();
        this.opcoesTemporalidade = ListaTemporalidade.getListaOpcoesTemporalidade();
        this.temporalidadeControl.setValue(this.opcoesTemporalidade[0].value);
        this.getAllConsultasMedico();
    }

    public verificaSexoUsuario(sexo: string): string {
        if (sexo == 'M') return './assets/profile/boy-1.svg';
        return './assets/profile/girl-1.svg';
    }

    public confirmModal(consulta: any): void {
        Swal.fire({
            icon: 'info',
            title: 'Deseja continuar?',
            text: 'Ao continuar a consulta será iniciada.',
            showCancelButton: true,
            confirmButtonText: `Sim`,
            cancelButtonText: `Não`,
        }).then((result) => {
            if (result.isConfirmed) {
                this.iniciarAtendimento(consulta);
            }
        });
    }

    public iniciarAtendimento(consulta: any): void {
        this._clinicaService
            .iniciarAtendimento(consulta.id)
            .pipe(untilDestroyed(this))
            .subscribe({
                next: (body: IIniciarAtendimentoModel) => {
                    this._router.navigate(['/pacientes/prontuario-paciente'], { state: body });
                    this._dadosMedicos.setDadosMedicosLocalStorage(body);
                },
            });
    }

    public getPerfilUser() {
        this.perfil = this._credentials.profile;
    }

    public getIdPerfil() {
        const tokenDecode: Token = this._credentials.decodeToken();
        this.idPerfil = tokenDecode.idPerfil;
    }

    public getAllConsultasMedico(page = 0): void {
        this.loading = true;
        this.consultas = [];
        this.totalItems = 0;
        this.page = -1;
        this.currentPage = -1;
        const valuesParse = this.temporalidadeControl.value;
        this._clinicaService
            .getAllConsultasMedico(this.itemsPerPage, page, this.idPerfil, valuesParse)
            .pipe(
                untilDestroyed(this),
                finalize(() => (this.loading = false))
            )
            .subscribe({
                next: (body: IConsultasModel) => {
                    this.consultas = body.content;
                    this.page = page + 1;
                    this.totalItems = body.totalElements;
                },
                error: (error: HttpErrorResponse) => {
                    log.error(error);
                },
            });
    }

    public pageChanged(event: number): void {
        this.getAllConsultasMedico(event - 1);
        this.page = event;
    }
}

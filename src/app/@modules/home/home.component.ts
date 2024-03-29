import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { ModalAnimationComponent } from '../../@shared/modal-animation/modal-animation.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CredentialsService, Token } from '../../auth/credentials.service';
import { PacienteService } from '@app/services/paciente/paciente.service';
import { untilDestroyed } from '../../@core/until-destroyed';
import { finalize } from 'rxjs/operators';
import {
    IDadosEstatisticosPacienteModel,
    IQuantitativosPorTipoProcedimentoModel,
    IDiagnosticosPorDataModel,
    IQuantitativosPorTipoAlergiaModel,
} from '../../models/dados-estatisticos-paciente-model';
import { ClinicaService } from '@app/services/clinica/clinica.service';
import { ListaTemporalidade } from './mocks/lista-temporalidade';
import {
    IConsultaMensalPorStatusModel,
    IDadosEstatisticosModel,
    IEspecializacoesMedicosModel,
    IMedicoAtendimentoModel,
    IPacienteConsultaModel,
    IQuantitativoUsuariosModel,
} from '../../models/dados-estastisticos-administrador';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
    @ViewChild(ModalAnimationComponent) modal: any;
    quote: string | undefined;
    isLoading = false;
    jwt = new JwtHelperService();
    public listaTemporalidade: any[] = [];

    public quantitativosPorTipoAlergia: IQuantitativosPorTipoAlergiaModel[];
    public quantitativosPorTipoProcedimento: IQuantitativosPorTipoProcedimentoModel[];
    public diagnosticosPorData: IDiagnosticosPorDataModel[];
    public quantitativosPorTipoEspecializacao: IQuantitativosPorTipoProcedimentoModel[];
    public quantitativoDadosMedicos: any;

    public medicoAtendimento: IMedicoAtendimentoModel[];
    public pacienteConsulta: IPacienteConsultaModel[];
    public consultaMensalPorStatus: IConsultaMensalPorStatusModel[];
    public especializacoesMes: IEspecializacoesMedicosModel[];
    public quantitativoUsuarios: IQuantitativoUsuariosModel[];

    perfil: string;
    idPerfil: number;

    constructor(
        private readonly _credentials: CredentialsService,
        private readonly _pacienteService: PacienteService,
        private readonly _clinicaService: ClinicaService
    ) {}

    ngOnDestroy(): void {}

    ngOnInit() {
        this.isLoading = true;
        this.getPerfilUser();
        this.getIdPerfil();
        this.verificaPerfilUsuarioLogado(3);
        this.listaTemporalidade = ListaTemporalidade.getListaOpcoesTemporalidadeHome();
    }

    public openModal(id: string) {
        this.modal.show(id);
    }

    public getPerfilUser() {
        this.perfil = this._credentials.profile;
    }

    public getIdPerfil() {
        const tokenDecode: Token = this._credentials.decodeToken();
        this.idPerfil = tokenDecode.idPerfil;
    }

    public verificaPerfilUsuarioLogado(idTemporalidade: any): void {
        if (this.perfil === 'PACIENTE') {
            this.getDadosEstatisticosPaciete();
        } else if (this.perfil === 'MEDICO') {
            this.getDadosEstatisticosMedico(idTemporalidade);
        } else if (this.perfil === 'ADMINISTRADOR') {
            this.getDadosEstatisticosAdministrador(idTemporalidade);
        } else {
            this.getDadosEstatisticosAuxiliar(idTemporalidade);
        }
    }

    /**
     * @description busca os dados estatisticos do Paciente e envia os dados para os
     * componentes filhos na Home.
     */
    private getDadosEstatisticosPaciete(): void {
        this.isLoading = true;
        this._pacienteService
            .getDadosEstatisticos()
            .pipe(
                untilDestroyed(this),
                finalize(() => (this.isLoading = false))
            )
            .subscribe({
                next: (body: IDadosEstatisticosPacienteModel) => {
                    this.quantitativosPorTipoAlergia = body.quantitativosPorTipoAlergia;
                    this.quantitativosPorTipoProcedimento = body.quantitativosPorTipoProcedimento;
                    this.diagnosticosPorData = body.diagnosticosPorData;
                    this.quantitativosPorTipoEspecializacao = body.quantitativosPorTipoEspecializacao;
                    this.quantitativoDadosMedicos = body;
                },
            });
    }

    /**
     * @description busca os dados estatisticos do Admnistrador e envia os dados para os
     * componentes filhos na Home.
     */
    private getDadosEstatisticosAdministrador(idTemporalidade: any): void {
        this.isLoading = true;
        this._clinicaService
            .getDadosEstatisticosHomeAdm(idTemporalidade)
            .pipe(
                untilDestroyed(this),
                finalize(() => (this.isLoading = false))
            )
            .subscribe({
                next: (body: IDadosEstatisticosModel) => {
                    this.medicoAtendimento = body.medicoAtendimento;
                    this.pacienteConsulta = body.pacienteConsulta;
                    this.consultaMensalPorStatus = body.consultaMensalPorStatus;
                    this.especializacoesMes = body.especializacoesMes;
                    this.quantitativoUsuarios = body.quantitativoUsuarios;
                },
            });
    }

    /**
     * @description busca os dados estatisticos do Auxiliar e envia os dados para os
     * componentes filhos na Home.
     */
    public getDadosEstatisticosAuxiliar(idTemporalidade: any): void {
        this.isLoading = true;
        this._clinicaService
            .getDadosEstatisticosHomeAuxiliar(idTemporalidade)
            .pipe(
                untilDestroyed(this),
                finalize(() => (this.isLoading = false))
            )
            .subscribe({
                next: (body: IDadosEstatisticosModel) => {
                    this.quantitativoUsuarios = body.quantitativoUsuarios;
                    this.consultaMensalPorStatus = body.consultaMensalPorStatus;
                },
            });
    }

    /**
     * @description busca os dados estatisticos do Auxiliar e envia os dados para os
     * componentes filhos na Home.
     */
    public getDadosEstatisticosMedico(idTemporalidade: any): void {
        this.isLoading = true;
        this._clinicaService
            .getDadosEstatisticosHomeMedico(idTemporalidade)
            .pipe(
                untilDestroyed(this),
                finalize(() => (this.isLoading = false))
            )
            .subscribe({
                next: (body: IDadosEstatisticosModel) => {
                    this.pacienteConsulta = body.pacienteConsulta;
                    this.consultaMensalPorStatus = body.consultaMensalPorStatus;
                },
            });
    }
}

import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ModalAnimationComponent } from '../../../../../@shared/modal-animation/modal-animation.component';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SweetalertService } from '../../../../../@shared/sweetalert/sweetalert.service';
import { ClinicaService } from '../../../../../services/clinica/clinica.service';
import { untilDestroyed } from '../../../../../@core/until-destroyed';
import { finalize } from 'rxjs/operators';
import { ITiposConsultaModel } from '../../../../../models/tipos-consulta-model';
import { MedicoService } from '../../../../../services/medico/medico.service';
import { Logger } from '../../../../../@core/logger.service';
import { IEspecializacaoModel } from '../../../../../models/especializacao-model';
import { UtilitariosService } from '../../../../../services/utilitarios/utilitarios.service';
import { CredentialsService } from '../../../../../auth/credentials.service';
import { AgendamentoConsultaService } from '@app/services/agendamento-consulta/agendamento-consulta.service';

const log = new Logger('Agendamento consulta home - paciente');

@Component({
    selector: 'app-nova-consulta-paciente',
    templateUrl: './nova-consulta-paciente.component.html',
    styleUrls: ['./nova-consulta-paciente.component.scss'],
})
export class NovaConsultaPacienteComponent implements OnInit, OnDestroy {
    @ViewChild(ModalAnimationComponent) modal: any;
    public form: FormGroup;
    public loading2 = false;
    public loading = false;
    public horariosDisponiveis: any[] = [];
    public tiposConsulta: ITiposConsultaModel[] = [];
    public messageError = '';
    public medicos: any[];
    public especializacoes: IEspecializacaoModel[];

    constructor(
        private readonly _fb: FormBuilder,
        private readonly _clinicaService: ClinicaService,
        private readonly _sweetAlert: SweetalertService,
        private readonly _medicoService: MedicoService,
        private readonly _utilitariosService: UtilitariosService,
        private readonly _service: AgendamentoConsultaService,
        private readonly _credentials: CredentialsService
    ) {}

    ngOnDestroy(): void {}

    ngOnInit(): void {
        this.initFormConsultaHome();
        this.getTiposConsulta();
        this.getEspecializacoes();
    }

    public getHorariosDiponiveisConsulta(): void {
        if (this.form.get('dtInicio').valid && this.form.get('idTipoProcedimento').valid) {
            this.loading2 = true;
            this.horariosDisponiveis = [];
            this._clinicaService
                .getHorariosDiponiveisConsulta(
                    this.form.get('dtInicio').value,
                    this.form.get('idTipoProcedimento').value
                )
                .pipe(
                    untilDestroyed(this),
                    finalize(() => (this.loading2 = false))
                )
                .subscribe({
                    next: (datas: any) => {
                        if (datas.length > 0) {
                            this._sweetAlert.openToasty('Horários encontrado!', 'success');
                            this.horariosDisponiveis = datas;
                        } else {
                            this._sweetAlert.openToasty('Nenhum horário disponível!', 'error');
                        }
                    },
                    error: (err) => {},
                });
        } else {
            this.form.get('idTipoProcedimento').markAsTouched();
        }
    }

    public getTiposConsulta(): void {
        this._clinicaService
            .getTiposConsulta()
            .pipe(untilDestroyed(this))
            .subscribe({
                next: (datas: ITiposConsultaModel[]) => {
                    this.tiposConsulta = datas;
                },
            });
    }

    public getMedicoPorEspecilizacao(idEspecializacao: number): void {
        this.loading = true;
        this.messageError = '';
        this._medicoService
            .getMedicoPorEspecializacao(idEspecializacao)
            .pipe(
                finalize(() => (this.loading = false)),
                untilDestroyed(this)
            )
            .subscribe({
                next: (medicos: any) => {
                    this.medicos = medicos;
                },
                error: (error) => {
                    this.messageError = error?.error?.message;
                    log.error(error);
                },
            });
    }

    public getEspecializacoes(): void {
        this._utilitariosService
            .getEspecializacoes()
            .pipe(untilDestroyed(this))
            .subscribe({
                next: (especializacoes: IEspecializacaoModel[]) => (this.especializacoes = especializacoes),
            });
    }

    public confirmAgendamento(): void {
        if (this.form.valid) {
            this.loading = true;
            const valuesSubmit = this.parseForm();
            const resquest$ = this._service.submitAgendamentoConsulta(valuesSubmit);
            resquest$
                .pipe(
                    finalize(() => {
                        this.loading = false;
                    }),
                    untilDestroyed(this)
                )
                .subscribe({
                    next: (body: any) => {
                        this._sweetAlert.openToasty('Consulta agendada com sucesso!', 'success');
                        this.modal.close('agendar-consulta-paciente');
                        this.clearForm();
                    },
                    error: (err: any) => {
                        log.error(err);
                    },
                });
        } else {
            Object.keys(this.form.controls).forEach((campo) => {
                const controle = this.form.get(campo);
                controle.markAsTouched();
            });

            if (this.form.get('horario').invalid)
                this._sweetAlert.openToasty('Selecione o horário da consulta!', 'info');
        }
    }

    public parseForm(): any {
        let values = Object.assign({}, this.form.value);
        values.dtInicio = `${values.dtInicio.split('-').reverse().join('-')} ${values.horario}`;

        delete values.especializacao;
        delete values.paciente;
        delete values.horario;
        return values;
    }

    public initFormConsultaHome(): void {
        this.form = this._fb.group({
            idPaciente: [null],
            idMedico: [null, Validators.required],
            idTipoProcedimento: [null, Validators.required],
            dtInicio: [null, Validators.required],
            observacao: [null],
            horario: [null, Validators.required],
            especializacao: [null, Validators.required],
        });

        this.form.get('idPaciente').setValue(this._credentials.decodeToken().idPerfil);
    }

    public clearForm(): void {
        this.form.get('idMedico').reset();
        this.form.get('especializacao').reset();
        this.form.get('observacao').reset();
        this.form.get('idTipoProcedimento').reset();
        this.form.get('dtInicio').reset();
        this.form.get('horario').reset();
    }

    public verificaPerfilCompleto(): void {
        this.modal.show('agendar-consulta-paciente');
        // if (this._credentials.profilePending) {
        //   this.modal.show('perfil-pendente');
        // } else {
        // }
    }

    public openModalCadastro(): void {
        this.modal.close('perfil-pendente');
        setTimeout(() => this.modal.show('complete-cadastro'), 300);
    }

    public closeModal(event: any): void {
        this.modal.close('complete-cadastro');
    }

    public closeAndResetFormConsulta() {
        this.modal.close('agendar-consulta-paciente');
        this.clearForm();
    }
}

import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { ListaUtilitarioMock } from '../../../../../mocks/lista-utilitario-mock';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { finalize } from 'rxjs/operators';
import { untilDestroyed } from '../../../../../@core/until-destroyed';
import { Logger } from '../../../../../@core/logger.service';
import { AgendamentoConsultaService } from '../../../../../services/agendamento-consulta/agendamento-consulta.service';
import { MedicoService } from '../../../../../services/medico/medico.service';
import { error } from '@angular/compiler/src/util';
import { UtilitariosService } from '../../../../../services/utilitarios/utilitarios.service';
import { IEspecializacaoModel } from '../../../../../models/especializacao-model';

const log = new Logger('Agendamento Consulta Home');

@Component({
  selector: 'app-agendamento-consulta',
  templateUrl: './agendamento-consulta.component.html',
  styleUrls: ['./agendamento-consulta.component.scss'],
})
export class AgendamentoConsultaComponent implements OnInit, OnChanges, OnDestroy {
  @Output() closeModal = new EventEmitter();
  @Output() stepId = new EventEmitter();
  @Input() formConsulta: FormGroup;
  public search = new FormControl();

  public utilitariosMock = new ListaUtilitarioMock();
  public listaSexo: any[];
  datas: any;
  loading = false;
  medicos: any[];
  especializacoes: IEspecializacaoModel[];
  messageError = '';

  constructor(
    private readonly _service: AgendamentoConsultaService,
    private readonly _medicoService: MedicoService,
    private readonly _utilitariosService: UtilitariosService
  ) {}

  ngOnDestroy() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.formConsulta) {
      this.datas = this.formConsulta.value;
    }
  }

  ngOnInit(): void {
    this.listaSexo = this.utilitariosMock.getListaSexos();
    this.getEspecializacoes();
  }

  public closeModalAndResetForm(id: string): void {
    this.formConsulta.reset();
    this.closeModal.emit({ close: true, modalId: id });
  }

  public setStep(id: number) {
    this.stepId.emit(id);
  }

  public confirmAgendamento(step: number): void {
    if (this.formConsulta.valid) {
      this.loading = true;
      const resquest$ = this._service.submitAgendamentoConsulta(this.formConsulta.value);
      resquest$
        .pipe(
          finalize(() => {
            this.loading = false;
          }),
          untilDestroyed(this)
        )
        .subscribe({
          next: () => {},
          error: (err: any) => {
            log.error(err);
          },
        });
      // this.stepId.emit(step);
    } else {
      Object.keys(this.formConsulta.controls).forEach((campo) => {
        const controle = this.formConsulta.get(campo);
        controle.markAsTouched();
      });
    }
  }

  /**
   * @description: apresenta um Alerta questionando a decisão do usuário, caso ele
   * confirme, os control paciente e procedimento é resetado e alterado
   * o step para zero (apresetará o componente inicial)
   */
  public back(): void {
    Swal.fire({
      icon: 'info',
      title: 'Deseja continuar?',
      text: 'Ao continuar, essa consulta será desconsiderada.',
      showCancelButton: true,
      confirmButtonText: `Sim`,
      cancelButtonText: `Não`,
    }).then((result) => {
      if (result.isConfirmed) {
        // this.formConsulta.get('paciente').reset();
        // this.formConsulta.get('procedimento').reset();
        this.stepId.emit(0);
      }
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
}

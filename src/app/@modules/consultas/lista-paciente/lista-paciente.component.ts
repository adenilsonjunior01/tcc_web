import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UtilitariosService } from '../../../services/utilitarios/utilitarios.service';
import { untilDestroyed } from '../../../@core/until-destroyed';
import { IConsultaModel } from '../../../models/consultas-model';
import { ModalAnimationComponent } from '../../../@shared/modal-animation/modal-animation.component';
import { AnimationOptions } from 'ngx-lottie';
import { ClinicaService } from '../../../services/clinica/clinica.service';
import { finalize } from 'rxjs/operators';
import { Logger } from '../../../@core/logger.service';
import { SweetalertService } from '../../../@shared/sweetalert/sweetalert.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

const log = new Logger('Página Consultas - Paciente');

@Component({
  selector: 'app-lista-paciente',
  templateUrl: './lista-paciente.component.html',
  styleUrls: ['./lista-paciente.component.scss'],
})
export class ListaPacienteComponent implements OnInit, OnDestroy {
  @ViewChild(ModalAnimationComponent) modal: any;

  public formOptions: FormGroup;
  public listaEspecialidade: any[];
  public especializacoes: any[];
  public consultas: IConsultaModel[] = [];
  public consulta: any;

  itemsPerPage = 5;
  currentPage: number;
  totalItems: number;
  page = 0;
  loading = false;
  paginationVisible = false;
  loading2 = false;
  public options: AnimationOptions = {
    path: '/assets/lottie/lottie-search.json',
  };

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _utilitariosService: UtilitariosService,
    private readonly _clinicaService: ClinicaService,
    private readonly _sweetAlert: SweetalertService
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.initForm();
    this.getEspecializacoes();
  }

  public initForm(): void {
    this.formOptions = this._fb.group({
      idEspecialidade: [null],
      dtInicio: [null],
      dtFim: [null],
    });
  }

  public getEspecializacoes(): void {
    this._utilitariosService
      .getEspecializacoes()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (especializacoes: any) => (this.especializacoes = especializacoes),
      });
  }

  public buscar(): void {}

  public pageChanged(event: number): void {
    // this.getConsultasTemporalidadeMedico(event - 1);
    this.page = event;
  }

  public openModalDetalhes(idModal: string, consulta: any): void {
    this.consulta = consulta;
    this.modal.show(idModal);
  }

  public clearForm(): void {
    this.formOptions.reset();
  }

  public closeModal(event: any): void {
    this.modal.close(event.modalId);
  }

  public submit(action: string, consulta: any): void {
    Swal.fire({
      icon: 'info',
      title: 'Deseja continuar?',
      text: 'Ao continuar a consulta será agendada.',
      showCancelButton: true,
      confirmButtonText: `Sim`,
      cancelButtonText: `Não`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.verifyAction(action, consulta);
      }
    });
  }

  private verifyAction(action: string, consulta: IConsultaModel): void {
    if (action === 'confirm') {
      this.confirmConsulta(consulta);
    } else if (action === 'cancel') {
      console.log('Cancel consulta');
    }
  }

  private confirmConsulta(consulta: IConsultaModel): void {
    this.loading2 = true;
    this._clinicaService
      .confirmConsulta(consulta?.id)
      .pipe(
        untilDestroyed(this),
        finalize(() => (this.loading2 = false))
      )
      .subscribe({
        next: (body: any) => {
          this._sweetAlert.openToasty('Consulta confirmada com sucesso.', 'success');
          this.buscar();
        },
        error: (error: HttpErrorResponse) => {
          log.error(error);
        },
      });
  }
}
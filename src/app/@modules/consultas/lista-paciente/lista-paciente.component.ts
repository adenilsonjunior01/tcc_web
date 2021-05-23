import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UtilitariosService } from '../../../services/utilitarios/utilitarios.service';
import { untilDestroyed } from '../../../@core/until-destroyed';
import { IConsultaModel, IConsultasModel } from '../../../models/consultas-model';
import { ModalAnimationComponent } from '../../../@shared/modal-animation/modal-animation.component';
import { AnimationOptions } from 'ngx-lottie';
import { ClinicaService } from '../../../services/clinica/clinica.service';
import { finalize } from 'rxjs/operators';
import { Logger } from '../../../@core/logger.service';
import { SweetalertService } from '../../../@shared/sweetalert/sweetalert.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CredentialsService } from '../../../auth/credentials.service';

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

  itemsPerPage = 15;
  currentPage: number;
  totalItems: number;
  page = 0;
  loading = false;
  paginationVisible = false;
  loading2 = false;
  public idPerfil: number;
  public options: AnimationOptions = {
    path: '/assets/lottie/lottie-search.json',
  };

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _utilitariosService: UtilitariosService,
    private readonly _clinicaService: ClinicaService,
    private readonly _sweetAlert: SweetalertService,
    private readonly _credentials: CredentialsService
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.idPerfil = this._credentials.decodeToken().idPerfil;
    this.initForm();
    this.getEspecializacoes();
    this.getConsultas();
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
    }
  }

  public confirmCancel(consulta: IConsultaModel): void {
    Swal.fire({
      icon: 'info',
      title: 'Deseja continuar?',
      text: 'Ao continuar a consulta será cancelada.',
      showCancelButton: true,
      confirmButtonText: `Sim`,
      cancelButtonText: `Não`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.cancelConsulta(consulta);
      }
    });
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
          this.getConsultas();
        },
        error: (error: HttpErrorResponse) => {
          log.error(error);
        },
      });
  }

  private cancelConsulta(consulta: IConsultaModel): void {
    this.loading2 = true;
    this._clinicaService
      .cancelConsulta(consulta?.id)
      .pipe(
        untilDestroyed(this),
        finalize(() => (this.loading2 = false))
      )
      .subscribe({
        next: (body: any) => {
          this._sweetAlert.openToasty('Consulta cancelada com sucesso.', 'success');
          this.getConsultas();
        },
        error: (error: HttpErrorResponse) => {
          log.error(error);
        },
      });
  }

  public getConsultas(page = 0): void {
    this.loading = true;
    this.consultas = [];
    this._clinicaService
      .getConsultasPaciente(this.idPerfil, this.itemsPerPage, page)
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
      });
  }

  public pageChanged(event: number): void {
    this.getConsultas(event - 1);
    this.page = event;
  }
}

import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MedicoService } from '@app/services/medico/medico.service';
import { ListaTemporalidade } from '../home/mocks/lista-temporalidade';
import { untilDestroyed } from '../../@core/until-destroyed';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SweetalertService } from '@app/@shared/sweetalert/sweetalert.service';
import { ClinicaService } from '../../services/clinica/clinica.service';
import { IConsultaModel, IConsultasModel } from '../../models/consultas-model';
import { finalize } from 'rxjs/operators';
import { Logger } from '../../@core/logger.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AnimationOptions } from 'ngx-lottie';
import { CredentialsService } from '../../auth/credentials.service';
import { ModalAnimationComponent } from '../../@shared/modal-animation/modal-animation.component';
import Swal from 'sweetalert2';

const log = new Logger('Página Consultas');

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.scss'],
})
export class ConsultasComponent implements OnInit, OnDestroy {
  @ViewChild(ModalAnimationComponent) modal: any;
  public listaTemporalidade: any[] = [];
  public listaMedicos: any[] = [];
  public formOptions: FormGroup;

  itemsPerPage = 5;
  currentPage: number;
  totalItems: number;
  page = 0;
  loading = false;
  paginationVisible = false;
  loading2 = false;
  perfil: string;
  public consultas: IConsultaModel[] = [];
  public options: AnimationOptions = {
    path: '/assets/lottie/lottie-search.json',
  };
  public consulta: any;

  constructor(
    private readonly _medicoService: MedicoService,
    private readonly _fb: FormBuilder,
    private readonly _sweetAlert: SweetalertService,
    private readonly _clinicaService: ClinicaService,
    private readonly _credentials: CredentialsService
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.initForm();
    this.listaTemporalidade = ListaTemporalidade.getListaOpcoesTemporalidade();
    this.getAllMedicos();
    this.formOptions.get('temporalidade').setValue(2);
    this.getConsultasTemporalidade();
    this.perfil = this._credentials.perfil;
  }

  public getAllMedicos(): void {
    this._medicoService
      .getTodosMedicos()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (body: any) => {
          this.listaMedicos = body;
        },
      });
  }

  public buscar(): void {
    if (this.formOptions.get('temporalidade').value && this.formOptions.get('medico').value) {
      this.getConsultasTemporalidadeMedico();
    } else if (this.formOptions.get('temporalidade').value && !this.formOptions.get('medico').value) {
      this.getConsultasTemporalidade();
    } else {
      this._sweetAlert.openToasty('Busca inválida', 'error');
    }
  }

  public getConsultasTemporalidadeMedico(page = 0): void {
    this.loading = true;
    let valuesParse: any = this.formOptions.value;

    this.consultas = [];
    this.paginationVisible = true;
    this._clinicaService
      .getAllConsultasMedico(this.itemsPerPage, page, valuesParse.medico, valuesParse.temporalidade - 1)
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
    this.getConsultasTemporalidadeMedico(event - 1);
    this.page = event;
  }

  public getConsultasTemporalidade(): void {
    this.loading = true;
    this.consultas = [];
    this.paginationVisible = false;
    this._clinicaService
      .getConsultasTemporalidade(this.formOptions.get('temporalidade').value)
      .pipe(
        untilDestroyed(this),
        finalize(() => (this.loading = false))
      )
      .subscribe({
        next: (body: any) => {
          this.consultas = body;
        },
        error: (error: HttpErrorResponse) => {
          log.error(error);
        },
      });
  }

  public initForm(): void {
    this.formOptions = this._fb.group({
      temporalidade: [null],
      medico: [null],
    });
  }

  public verificaSexoUsuario(sexo: string): string {
    if (sexo == 'M') return './assets/profile/boy-1.svg';
    return './assets/profile/girl-1.svg';
  }

  public clearForm(): void {
    this.formOptions.reset();
  }

  public openModalDetalhes(idModal: string, consulta: any): void {
    this.consulta = consulta;
    this.modal.show(idModal);
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

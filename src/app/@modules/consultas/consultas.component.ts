import { Component, OnInit, OnDestroy } from '@angular/core';
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

const log = new Logger('Página Consultas');

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.scss'],
})
export class ConsultasComponent implements OnInit, OnDestroy {
  public listaTemporalidade: any[] = [];
  public listaMedicos: any[] = [];
  public formOptions: FormGroup;

  itemsPerPage = 15;
  currentPage: number;
  totalItems: number;
  page = 0;
  loading = false;
  paginationVisible = false;
  public consultas: IConsultaModel[] = [];
  public options: AnimationOptions = {
    path: '/assets/lottie/lottie-search.json',
  };

  constructor(
    private readonly _medicoService: MedicoService,
    private readonly _fb: FormBuilder,
    private readonly _sweetAlert: SweetalertService,
    private readonly _clinicaService: ClinicaService
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.initForm();
    this.listaTemporalidade = ListaTemporalidade.getListaOpcoesTemporalidade();
    this.getAllMedicos();
    this.formOptions.get('temporalidade').setValue(2);
    this.getConsultasTemporalidade();
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
    this.consultas = [];
    this.paginationVisible = true;
    this._clinicaService
      .getAllConsultasMedico(
        this.itemsPerPage,
        page,
        this.formOptions.get('medico').value,
        this.formOptions.get('temporalidade').value
      )
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
}

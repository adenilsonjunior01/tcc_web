import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ClinicaService } from '@app/services/clinica/clinica.service';
import { ListaPacientesMock } from '../../../../mocks/lista-pacientes-mock';
import { IConsultasModel, IConsultaModel } from '../../../../models/consultas-model';
import { CredentialsService } from '../../../../auth/credentials.service';
import { untilDestroyed } from '../../../../@core/until-destroyed';
import { finalize } from 'rxjs/operators';
import { AnimationOptions } from 'ngx-lottie';
import { ModalAnimationComponent } from '../../../../@shared/modal-animation/modal-animation.component';

@Component({
  selector: 'app-table-prontuarios',
  templateUrl: './table-prontuarios.component.html',
  styleUrls: ['./table-prontuarios.component.scss'],
})
export class TableProntuariosComponent implements OnInit, OnDestroy {
  @ViewChild(ModalAnimationComponent) modal: any;

  private readonly listaPacientesMock = new ListaPacientesMock();
  especialidades: any[];
  public consultas: IConsultaModel[] = [];
  public idPerfil: number;
  itemsPerPage = 15;
  currentPage: number;
  totalItems: number;
  page = 0;
  public prontuario: any;

  public loading = false;

  public options: AnimationOptions = {
    path: '/assets/lottie/lottie-search.json',
  };
  constructor(private readonly _clinicaService: ClinicaService, private readonly _credentials: CredentialsService) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.getIdPerfil();
    this.getEspecialidades();
    this.getDadosConsulta();
  }

  /**
   * @description recupera ID do Paciente no Token
   */
  public getIdPerfil(): void {
    this.idPerfil = this._credentials.decodeToken().idPerfil;
  }

  public getEspecialidades(): void {
    this.especialidades = this.listaPacientesMock.listaPacientesMedico();
  }

  public getDadosConsulta(page = 0): void {
    this.loading = true;
    this.consultas = [];
    this.totalItems = 0;
    this._clinicaService
      .getConsultasPaciente(this.idPerfil, this.itemsPerPage, page)
      .pipe(
        finalize(() => (this.loading = false)),
        untilDestroyed(this)
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
    this.getDadosConsulta(event - 1);
    this.page = event;
  }

  public openModalProntuario(prontuario: any, idModal: string): void {
    this.prontuario = prontuario;
    this.modal.show(idModal);
  }

  public closeModal(idModal: string): void {
    this.modal.close(idModal);
  }
}

import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { MedicoService } from '@app/services/medico/medico.service';
import { FormUpdateMedico } from '../../class/form-update-medico';
import { untilDestroyed } from '../../../../@core/until-destroyed';
import { finalize } from 'rxjs/operators';
import { Logger } from '../../../../@core/logger.service';
import { ListaUtilitarioMock } from '../../../../mocks/lista-utilitario-mock';
import { UtilitariosService } from '../../../../services/utilitarios/utilitarios.service';
import { SweetalertService } from '../../../../@shared/sweetalert/sweetalert.service';
import { CredentialsService } from '../../../../auth/credentials.service';

const log = new Logger('Update Médico');

@Component({
  selector: 'app-form-update-medico',
  templateUrl: './form-update-medico.component.html',
  styleUrls: ['./form-update-medico.component.scss'],
})
export class FormUpdateMedicoComponent implements OnInit, OnDestroy, OnChanges {
  @Input() dadosUser: any;
  @Input() type: any;
  @Output() closeModal = new EventEmitter();

  public formDadosProfissionais: FormGroup;
  public readonly _formConfig = new FormUpdateMedico();
  private readonly utilitariosMock = new ListaUtilitarioMock();
  public loading = false;
  public errorMessage = '';
  public listaSexo: any[];
  public listaEstados: any[];
  public especializacoes: any[];
  public messageError = '';

  constructor(
    private readonly _medicoService: MedicoService,
    private readonly _utilitariosService: UtilitariosService,
    private readonly _sweetAlert: SweetalertService,
    private readonly _credentials: CredentialsService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    let count: any;
    if (this.formDadosProfissionais) {
      count = (this.formDadosProfissionais.controls['especializacoes'] as FormGroup).controls.length;
    }
    if (this.dadosUser && count === 0) {
      this.setEspecializacoes(this.dadosUser?.medico?.especializacoes);
      this.formDadosProfissionais.get('crm').setValue(this.dadosUser?.medico?.crm);
      this.formDadosProfissionais.get('hrEntrada').setValue(this.dadosUser?.medico?.hrEntrada);
      this.formDadosProfissionais.get('hrSaida').setValue(this.dadosUser?.medico?.hrSaida);
    }
  }

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.getEspecializacoes();
    this.formDadosProfissionais = this._formConfig.initForm();
    this.listaSexo = this.utilitariosMock.getListaSexos();
    this.listaEstados = this.utilitariosMock.getEstados();
    this.decodeToken();
  }

  private decodeToken(): void {
    const decode = this._credentials.decodeToken();
    this.formDadosProfissionais.get('idUser').setValue(decode.id);
  }

  public get formArrayEspecializacoes(): FormArray {
    return this.formDadosProfissionais.get('especializacoes') as FormArray;
  }

  /**
   * @description seta as especializações cadastradas do médico no formulário atual
   */
  public setEspecializacoes(especializacoes: any[]): void {
    especializacoes.forEach((value: any, index: number) => {
      this.addNewEspecializacao();
      ((this.formDadosProfissionais.controls['especializacoes'] as FormArray).controls[index] as FormGroup)
        .get('id')
        .setValue(value.id);
    });
  }

  public addNewEspecializacao() {
    (this.formDadosProfissionais.get('especializacoes') as FormArray).push(this._formConfig.newEspecializacao());
  }

  public removeObject(index: number): void {
    (this.formDadosProfissionais.get('especializacoes') as FormArray).removeAt(index);
  }

  public clearFormDadosProfissionais() {
    this.formDadosProfissionais.reset();
  }

  public updateDadosProfissionais() {
    this.loading = true;
    const values = this._formConfig.parserForm(this.formDadosProfissionais.value);
    this._medicoService
      .updateMedico(values)
      .pipe(
        finalize(() => (this.loading = false)),
        untilDestroyed(this)
      )
      .subscribe({
        next: () => {
          this._sweetAlert.openToasty('Dados atualizados com sucesso!', 'success');
          this.closeModal.emit('perfil');
        },
        error: (error) => {
          this.messageError = error.error.message;
          log.error(error);
        },
      });
  }

  public getEspecializacoes(): void {
    this._utilitariosService
      .getEspecializacoes()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (especializacoes: any) => {
          this.especializacoes = especializacoes;
        },
      });
  }

  public modalCloseEvent(idModal: string): void {
    this.closeModal.emit(idModal);
  }
}

import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ListaUtilitarioMock } from '../../mocks/lista-utilitario-mock';
import { FormCadastroMedico } from '../../shell/class/form-casdastro-medico';
import { MedicoService } from '../../services/medico/medico.service';
import { finalize } from 'rxjs/operators';
import { untilDestroyed } from '../../@core/until-destroyed';
import { Logger } from '../../@core/logger.service';
import { CredentialsService, Token } from '../../auth/credentials.service';
import { SweetalertService } from '../../@shared/sweetalert/sweetalert.service';
import { UtilitariosService } from '../../services/utilitarios/utilitarios.service';

const log = new Logger('Dados Básicos Médico');

@Component({
  selector: 'app-form-dados-basicos-medico',
  templateUrl: './form-dados-basicos-medico.component.html',
  styleUrls: ['./form-dados-basicos-medico.component.scss'],
})
export class FormDadosBasicosMedicoComponent implements OnInit, OnDestroy {
  @Output() closeModal = new EventEmitter();
  public utilitariosMock = new ListaUtilitarioMock();
  public listaSexo: any[];
  public especializacoes: any[];
  public loading = false;
  public errorRequest = false;
  public messageError = '';
  public user: Token;

  public form: FormGroup;

  private readonly _formDadosBasicos = new FormCadastroMedico();

  constructor(
    private readonly _service: MedicoService,
    private readonly _credentials: CredentialsService,
    private readonly _sweetAlert: SweetalertService,
    private readonly _utilitariosService: UtilitariosService
  ) {}
  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.form = this._formDadosBasicos.initForm();
    this.listaSexo = this.utilitariosMock.getListaSexos();
    // this.especializacoes = this.utilitariosMock.listaEspecializacoes();
    this.getEspecializacoes();

    this.user = this._credentials.decodeToken();
    this.setIdUserForm();
  }

  private setIdUserForm() {
    this.form.get('idUser').setValue(this.user.id);
  }

  public get formArrayEspecializacoes(): FormArray {
    return this.form.get('especializacoes') as FormArray;
  }

  public addNewEspecializacao() {
    (this.form.get('especializacoes') as FormArray).push(this._formDadosBasicos.newEspecializacao());
  }

  public removeObject(index: number): void {
    (this.form.get('especializacoes') as FormArray).removeAt(index);
  }

  public clearForm(): void {
    this.form.get('crm').reset();
    this.form.get('especializacoes').reset();
  }

  public submitForm(): void {
    if (this.form.valid) {
      const values = this._formDadosBasicos.parserForm(this.form.value);
      this.loading = true;
      this._service
        .saveMedico(values)
        .pipe(
          finalize(() => {
            this.loading = false;
          }),
          untilDestroyed(this)
        )
        .subscribe({
          next: () => {
            this._sweetAlert.openToasty('Dados atualizados com sucesso!', 'success');
          },
          error: (error: any) => {
            this.errorRequest = true;
            this.messageError = error?.error?.message;
            log.debug(`Error`);
          },
        });
    }
  }

  public getEspecializacoes(): void {
    this._utilitariosService
      .getEspecializacoes()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (especializacoes: any) => (this.especializacoes = especializacoes),
      });
  }

  public closeModalForm() {
    this.closeModal.emit(true);
  }
}

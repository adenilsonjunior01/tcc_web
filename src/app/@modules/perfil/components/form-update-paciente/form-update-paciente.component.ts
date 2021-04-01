import { Component, Input, OnInit, OnChanges, OnDestroy, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormUpdatePaciente } from '../../class/form-update-paciente';
import { Logger } from '../../../../@core/logger.service';
import { IDadosUserModel } from '../../../../models/dados-user-model';
import { SweetalertService } from '@app/@shared/sweetalert/sweetalert.service';
import { untilDestroyed } from '../../../../@core/until-destroyed';
import { finalize } from 'rxjs/operators';
import { CredentialsService, Token } from '../../../../auth/credentials.service';
import { AuthenticationService } from '../../../../auth/authentication.service';
import { FormUpdateUser } from '../../class/form-update-user';
import { ListaUtilitarioMock } from '../../../../mocks/lista-utilitario-mock';
import * as dayjs from 'dayjs';
import { UsuarioService } from '../../../../services/usuario/usuario.service';
import { PacienteService } from '../../../../services/paciente/paciente.service';

const log = new Logger('Update Paciente');

@Component({
  selector: 'app-form-update-paciente',
  templateUrl: './form-update-paciente.component.html',
  styleUrls: ['./form-update-paciente.component.scss'],
})
export class FormUpdatePacienteComponent implements OnInit, OnDestroy, OnChanges {
  @Input() dadosUser: IDadosUserModel;
  @Input() type: any; // Type 1: Formulário dados pessoais, type 2: Formulário convênio
  @Output() modalClose = new EventEmitter();

  public form: FormGroup;
  public formUser: FormGroup;

  private readonly _formConfig = new FormUpdatePaciente();

  public loading = false;
  public tokenDecode: Token;
  isLoading = false;
  hide = true;
  hide2 = true;

  public readonly _formConfigUser = new FormUpdateUser();
  private readonly utilitariosMock = new ListaUtilitarioMock();

  public listaSexo: any[];
  public listaEstados: any[];
  public messageError = '';

  constructor(
    private readonly _pacienteService: PacienteService,
    private readonly _sweetAlert: SweetalertService,
    private readonly _credentials: CredentialsService,
    private readonly _usuarioService: UsuarioService
  ) {}

  ngOnDestroy(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.dadosUser) {
      this.setDadosConvenio(this.dadosUser);
    }
  }

  ngOnInit(): void {
    this.listaSexo = this.utilitariosMock.getListaSexos();
    this.listaEstados = this.utilitariosMock.getEstados();
    this.decodeToken();
    this.formUser = this._formConfigUser.initForm();
    this.form = this._formConfig.initForm();
  }

  public updatePaciente(): void {
    this.loading = true;
    this._pacienteService
      .updatePaciente(this.form.value)
      .pipe(
        untilDestroyed(this),
        finalize(() => (this.loading = false))
      )
      .subscribe({
        next: () => {
          this._sweetAlert.openToasty('Dados atualizados com sucesso', 'success');
          this.modalClose.emit('perfil');
        },
        error: (error: any) => {
          log.error(error);
        },
      });
  }

  public setDadosConvenio(dadosUser: IDadosUserModel): void {
    if (this.form) {
      this.form.get('descConvenio').setValue(dadosUser?.paciente?.descConvenio);
      this.form.get('nuInscricaoConvenio').setValue(dadosUser?.paciente?.nuInscricaoConvenio);
      this.form.get('compartilhaDados').setValue(dadosUser?.paciente?.compartilhaDados);

      this.form.get('idUser').setValue(this.tokenDecode.id);
      this.form.get('idPaciente').setValue(this.tokenDecode.idPerfil);
    }
  }

  private decodeToken(): void {
    this.tokenDecode = this._credentials.decodeToken();
  }

  public modalCloseEvent(idModal: string): void {
    this.modalClose.emit(idModal);
  }

  /**
   * @description atualiza usuário
   */
  public submitFormUser(): void {
    if (this.formUser.valid) {
      this.messageError = '';
      this.loading = true;
      const values = this._formConfigUser.parseForm(this.formUser.value);
      this._usuarioService
        .updateUser(values)
        .pipe(
          untilDestroyed(this),
          finalize(() => (this.loading = false))
        )
        .subscribe({
          next: () => {
            this._sweetAlert.openToasty('Usuário atualizado com sucesso', 'success');
            this.modalClose.emit('perfil');
            this.formUser.reset();
          },
          error: (error) => {
            log.error(error);
            this.messageError = error?.error?.message;
          },
        });
    }
  }

  public clearFormUser(): void {
    this.formUser.reset();
  }

  public setDadosPessoais(dadosUser: IDadosUserModel): void {
    this.formUser.get('nome').setValue(dadosUser?.nome);
    this.formUser.get('cpf').setValue(dadosUser?.cpf);
    this.formUser.get('email').setValue(dadosUser?.email);
    this.formUser.get('sexo').setValue(dadosUser?.sexo);
    this.formUser.get('dtNascimento').setValue(dayjs(dadosUser?.dtNascimento).format('DD/MM/YYYY'));
    this.formUser.get('telefone').setValue(dadosUser?.telefone);

    this.formUser.controls['endereco'].get('descBairro').setValue(dadosUser?.endereco?.descBairro);
    this.formUser.controls['endereco'].get('descRua').setValue(dadosUser?.endereco?.descRua);
    this.formUser.controls['endereco'].get('noEstado').setValue(dadosUser?.endereco?.noEstado);
    this.formUser.controls['endereco'].get('noCidade').setValue(dadosUser.endereco?.noCidade);
    this.formUser.controls['endereco'].get('nuCep').setValue(dadosUser?.endereco?.nuCep);
    this.formUser.controls['endereco'].get('numero').setValue(dadosUser?.endereco?.numero);
  }
}

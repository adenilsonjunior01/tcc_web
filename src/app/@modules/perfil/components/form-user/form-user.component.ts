import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { IDadosUserModel } from '../../../../models/dados-user-model';
import { FormGroup } from '@angular/forms';
import { FormUpdateUser } from '../../class/form-update-user';
import { ListaUtilitarioMock } from '../../../../mocks/lista-utilitario-mock';
import { UsuarioService } from '../../../../services/usuario/usuario.service';
import { SweetalertService } from '../../../../@shared/sweetalert/sweetalert.service';
import { untilDestroyed } from '../../../../@core/until-destroyed';
import { finalize } from 'rxjs/operators';
import { Logger } from '../../../../@core/logger.service';
import * as dayjs from 'dayjs';

const log = new Logger('Perfil - Form update user');

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss'],
})
export class FormUserComponent implements OnInit, OnChanges, OnDestroy {
  @Input() dadosUser: IDadosUserModel;
  @Output() modalClose = new EventEmitter();

  public formUser: FormGroup;
  public loading = false;

  public readonly _formConfigUser = new FormUpdateUser();
  private readonly utilitariosMock = new ListaUtilitarioMock();
  public listaSexo: any[];
  public listaEstados: any[];
  public messageError = '';

  constructor(private readonly _usuarioService: UsuarioService, private readonly _sweetAlert: SweetalertService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.dadosUser) {
      this.setDadosPessoais(this.dadosUser);
    }
  }
  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.formUser = this._formConfigUser.initForm();
    this.listaSexo = this.utilitariosMock.getListaSexos();
    this.listaEstados = this.utilitariosMock.getEstados();
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
          },
          error: (error) => {
            log.error(error);
            this.messageError = error?.error?.message;
          },
        });
    }
  }

  public setDadosPessoais(dadosUser: IDadosUserModel): void {
    if (this.formUser && dadosUser) {
      this.formUser.get('nome').setValue(dadosUser?.nome);
      this.formUser.get('cpf').setValue(dadosUser?.cpf);
      this.formUser.get('sexo').setValue(dadosUser?.sexo);
      this.formUser.get('dtNascimento').setValue(dadosUser?.dtNascimento);
      this.formUser.get('telefone').setValue(dadosUser?.telefone);
      this.formUser.get('email').setValue(dadosUser?.email);

      this.formUser.controls['endereco'].get('descBairro').setValue(dadosUser?.endereco?.descBairro);
      this.formUser.controls['endereco'].get('descRua').setValue(dadosUser?.endereco?.descRua);
      this.formUser.controls['endereco'].get('noEstado').setValue(dadosUser?.endereco?.noEstado);
      this.formUser.controls['endereco'].get('noCidade').setValue(dadosUser.endereco?.noCidade);
      this.formUser.controls['endereco'].get('nuCep').setValue(dadosUser?.endereco?.nuCep);
      this.formUser.controls['endereco'].get('numero').setValue(dadosUser?.endereco?.numero);
    }
  }

  public clearFormUser(): void {
    this.formUser.reset();
  }
}

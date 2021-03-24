import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { MedicoService } from '@app/services/medico/medico.service';
import { FormUpdateMedico } from '../../class/form-update-medico';
import { untilDestroyed } from '../../../../@core/until-destroyed';
import { finalize } from 'rxjs/operators';
import { Logger } from '../../../../@core/logger.service';
import { FormUpdateUser } from '../../class/form-update-user';
import { ListaUtilitarioMock } from '../../../../mocks/lista-utilitario-mock';
import { UtilitariosService } from '../../../../services/utilitarios/utilitarios.service';
import { UsuarioService } from '../../../../services/usuario/usuario.service';
import { SweetalertService } from '../../../../@shared/sweetalert/sweetalert.service';
import { CredentialsService } from '../../../../auth/credentials.service';

const log = new Logger('Update Médico');

@Component({
  selector: 'app-form-update-medico',
  templateUrl: './form-update-medico.component.html',
  styleUrls: ['./form-update-medico.component.scss'],
})
export class FormUpdateMedicoComponent implements OnInit, OnDestroy {
  @Input() dadosUser: any;
  @Input() type: any;
  @Output() closeModal = new EventEmitter();

  public formDadosProfissionais: FormGroup;
  public formUser: FormGroup;
  public readonly _formConfig = new FormUpdateMedico();
  public readonly _formConfigUser = new FormUpdateUser();
  private readonly utilitariosMock = new ListaUtilitarioMock();
  public loading = false;
  public errorMessage = '';
  public listaSexo: any[];
  public listaEstados: any[];
  public especializacoes: any[];

  constructor(
    private readonly _medicoService: MedicoService,
    private readonly _utilitariosService: UtilitariosService,
    private readonly _userService: UsuarioService,
    private readonly _sweetAlert: SweetalertService,
    private readonly _credentials: CredentialsService
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.getEspecializacoes();
    this.formDadosProfissionais = this._formConfig.initForm();
    this.formUser = this._formConfigUser.initForm();
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

  public updateUser() {
    if (this.formUser.valid) {
      const values = this._formConfigUser.parseForm(this.formUser.value);
      this._userService
        .updateUser(values)
        .pipe(
          finalize(() => (this.loading = false)),
          untilDestroyed(this)
        )
        .subscribe({
          next: () => {
            this._sweetAlert.openToasty('Usuário atualizado com sucesso!', 'success');
            this.closeModal.emit('perfil');
          },
          error: (error) => {
            log.error(error);
          },
        });
    }
  }

  public updateDadosProfissionais() {
    this._medicoService
      .updateMedico(this.formDadosProfissionais.value)
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
          this.setEspecializacoes(especializacoes);
        },
      });
  }
}

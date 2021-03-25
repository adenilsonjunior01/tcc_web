import { Component, Input, OnInit, OnChanges, OnDestroy, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormUpdatePaciente } from '../../class/form-update-paciente';
import { PacienteService } from '../../../../services/paciente.service';
import { Logger } from '../../../../@core/logger.service';
import { IDadosUserModel } from '../../../../models/dados-user-model';
import { SweetalertService } from '@app/@shared/sweetalert/sweetalert.service';
import { untilDestroyed } from '../../../../@core/until-destroyed';
import { finalize } from 'rxjs/operators';
import { CredentialsService, Token } from '../../../../auth/credentials.service';

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

  private readonly _formConfig = new FormUpdatePaciente();

  public loading = false;
  public tokenDecode: Token;

  constructor(
    private readonly _pacienteService: PacienteService,
    private readonly _sweetAlert: SweetalertService,
    private readonly _credentials: CredentialsService
  ) {}

  ngOnDestroy(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.dadosUser) {
      this.setDadosConvenio(this.dadosUser);
    }
  }

  ngOnInit(): void {
    this.form = this._formConfig.initForm();

    this.decodeToken();
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
          this._sweetAlert.openToasty('Dados atualizado com sucesso', 'success');
          this.modalClose.emit('perfil');
        },
        error: (error) => {
          log.error(error);
        },
      });
  }

  public setDadosConvenio(dadosUser: IDadosUserModel): void {
    this.form.get('descConvenio').setValue(dadosUser?.paciente?.descConvenio);
    this.form.get('nuInscricaoConvenio').setValue(dadosUser?.paciente?.nuInscricaoConvenio);
    this.form.get('compartilhaDados').setValue(dadosUser?.paciente?.compartilhaDados);

    this.form.get('idUser').setValue(this.tokenDecode.id);
    this.form.get('idPaciente').setValue(this.tokenDecode.idPerfil);
  }

  private decodeToken(): void {
    this.tokenDecode = this._credentials.decodeToken();
  }

  public modalCloseEvent(idModal: string): void {
    this.modalClose.emit(idModal);
  }
}

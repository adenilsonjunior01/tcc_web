import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { UsuarioService } from '@app/services/usuario/usuario.service';
import { CredentialsService, Token } from '../../auth/credentials.service';
import { SweetalertService } from '../../@shared/sweetalert/sweetalert.service';
import { FormGroup } from '@angular/forms';
import { FormCadastroPaciente } from '../../shell/class/form-cadastro-paciente';
import { finalize } from 'rxjs/operators';
import { untilDestroyed } from '../../@core/until-destroyed';
import { Logger } from '../../@core/logger.service';

const log = new Logger('Dados Básicos Paciente');

@Component({
  selector: 'app-form-dados-basicos-usuario',
  templateUrl: './form-dados-basicos-usuario.component.html',
  styleUrls: ['./form-dados-basicos-usuario.component.scss'],
})
export class FormDadosBasicosUsuarioComponent implements OnInit, OnDestroy {
  @Output() closeModal = new EventEmitter();
  public form: FormGroup;
  public loading = false;
  public errorRequest = false;
  public messageError = '';
  public user: Token;

  private readonly _formPaciente = new FormCadastroPaciente();

  constructor(
    private readonly _service: UsuarioService,
    private readonly _credentials: CredentialsService,
    private readonly _sweetAlert: SweetalertService
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.form = this._formPaciente.initForm();
    this.user = this._credentials.decodeToken();
    this.setIdUserForm();
  }

  private setIdUserForm() {
    this.form.get('idUser').setValue(this.user.id);
    this.form.get('idUser').setValue(this.user.idPerfil);
  }

  public clearForm(): void {
    this.form.get('nuInscricaoConvenio').reset();
    this.form.get('descConvenio').reset();
  }

  public submitForm(): void {
    if (this.form.valid) {
      this.loading = true;
      this._service
        .updatePaciente(this.form.value)
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

  public closeModalForm() {
    this.closeModal.emit(true);
  }
}

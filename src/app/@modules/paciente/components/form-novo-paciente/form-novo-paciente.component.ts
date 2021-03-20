import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormPaciente } from '../../class/form-paciente';
import { IListaPerfil, ListaPerfilMock } from '../../../../mocks/lista-perfis-mock';
import { SweetalertService } from '../../../../@shared/sweetalert/sweetalert.service';
import { ListaUtilitarioMock } from '../../../../mocks/lista-utilitario-mock';
import { ModalAnimationComponent } from '../../../../@shared/modal-animation/modal-animation.component';
import { UsuarioService } from '../../../../services/usuario/usuario.service';
import { IUsuarioModel } from '../../../../models/usuario-model';
import { finalize } from 'rxjs/operators';
import { untilDestroyed } from '../../../../@core/until-destroyed';
import { Logger } from '../../../../@core/logger.service';

const log = new Logger('Novo Paciente');

@Component({
  selector: 'app-form-novo-paciente',
  templateUrl: './form-novo-paciente.component.html',
  styleUrls: ['./form-novo-paciente.component.scss'],
})
export class FormNovoPacienteComponent implements OnInit, OnDestroy {
  @ViewChild(ModalAnimationComponent) modal: any;

  public form: FormGroup;
  private readonly _formPaciente = new FormPaciente();
  public listaPerfis: IListaPerfil[];
  public controlPerfil = new FormControl({ disabled: true });
  public loading = false;
  public messageError = '';
  public utilitariosMock = new ListaUtilitarioMock();
  public listaSexo: any[];
  public listaEstados: any[];
  public dadosPaciente: IUsuarioModel;

  constructor(private readonly _sweetAlert: SweetalertService, private readonly _service: UsuarioService) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.form = this._formPaciente.initForm();
    this.listaSexo = this.utilitariosMock.getListaSexos();
    this.listaEstados = this.utilitariosMock.getEstados();
    this.listaPerfis = new ListaPerfilMock().getListaPerfil();
    this.filterPerfil();
  }

  private filterPerfil() {
    const filter = this.listaPerfis.filter((v: IListaPerfil) => v.id === 3);
    this.controlPerfil.setValue(filter[0].description);
  }

  public resetForm() {
    this.form.reset();
  }

  public submitFormPaciente() {
    if (this.form.valid) {
      this.loading = true;
      const valuesSubmit: IUsuarioModel = this._formPaciente.parseFormPaciente(this.form.value);
      this._service
        .saveNewUser(valuesSubmit)
        .pipe(
          finalize(() => (this.loading = false)),
          untilDestroyed(this)
        )
        .subscribe({
          next: (body: IUsuarioModel) => {
            this.dadosPaciente = body;
            this._sweetAlert.openToasty('Cadastro realizado com sucesso!', 'success');
            this.form.reset();
            this.modal.close('novo-paciente');
            setTimeout(() => this.modal.show('aviso-senha-paciente'), 600);
          },
          error: (error) => {
            this.messageError = error?.error?.message;
            log.debug(`Error`);
          },
        });
    }
  }
}

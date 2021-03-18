import { Component, EventEmitter, OnInit, Output, OnDestroy, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ListaUtilitarioMock } from '../../../../../mocks/lista-utilitario-mock';
import { FormPreCadastroPaciente } from '../../../class/form-pre-cadastro-paciente';
import Swal from 'sweetalert2';
import { AgendamentoConsultaService } from '../../../../../services/agendamento-consulta/agendamento-consulta.service';
import { finalize } from 'rxjs/operators';
import { untilDestroyed } from '../../../../../@core/until-destroyed';
import { Logger } from '../../../../../@core/logger.service';
import { IListaPerfil, ListaPerfilMock } from '../../../../../mocks/lista-perfis-mock';
import { SweetalertService } from '@app/@shared/sweetalert/sweetalert.service';
import { IUsuarioModel } from '@app/models/usuario-model';

const log = new Logger('Pre-cadastro');

@Component({
  selector: 'app-form-pre-cadastro-paciente',
  templateUrl: './form-pre-cadastro-paciente.component.html',
  styleUrls: ['./form-pre-cadastro-paciente.component.scss'],
})
export class FormPreCadastroPacienteComponent implements OnInit, OnDestroy {
  @Output() closeModal = new EventEmitter();
  @Output() stepId = new EventEmitter();
  @Output() formPreCadastroPaciente = new EventEmitter();
  @Input() novoPaciente = false;
  @Output() dadosUsuario = new EventEmitter();

  public readonly _formPreCadastro = new FormPreCadastroPaciente();
  public form: FormGroup;

  public utilitariosMock = new ListaUtilitarioMock();
  public listaSexo: any[];
  public listaPerfis: IListaPerfil[];
  public loading = false;
  controlPerfil = new FormControl({ disabled: true });
  messageError = '';

  constructor(private readonly _service: AgendamentoConsultaService, private readonly _sweetAlert: SweetalertService) {}

  ngOnDestroy() {}

  ngOnInit(): void {
    this.listaPerfis = new ListaPerfilMock().getListaPerfil();
    this.listaSexo = this.utilitariosMock.getListaSexos();
    this.form = this._formPreCadastro.initFormPreCadastroPaciente();
    this.filterPerfil();
  }

  private filterPerfil() {
    const filter = this.listaPerfis.filter((v: IListaPerfil) => v.id === 3);
    this.controlPerfil.setValue(filter[0].description);
  }

  public closeModalAndResetForm(closeModal = false, id: string) {
    this.closeModal.emit({ close: closeModal, modalId: id });
  }

  public setStep(id: number) {
    this.stepId.emit(id);
  }

  public back() {
    Swal.fire({
      icon: 'question',
      title: 'Deseja continuar?',
      text: 'Ao continuar, esse cadastro será desconsiderado.',
      showCancelButton: true,
      confirmButtonText: `Sim`,
      cancelButtonText: `Não`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.stepId.emit(0);
      }
    });
  }

  /**
   *
   * @param idStep: Id do próximo Step
   * @description: Envia o formulário de pré-cadastro e na resposta de sucesso, emite
   * dois eventos: Um pra alterar o formulário e o Outro com o dados do usuário que foi cadastrado
   * pra popular outros componentes.
   */
  public submitPreCadastroPaciente(idStep: number) {
    if (this.form.valid) {
      this.messageError = '';
      const values = this._formPreCadastro.parseFormPrecadastroPaciente(this.form.value);
      this.loading = true; // IMPLEMENTAR LOADING46751688091
      const request$ = this._service.submitPreCadastroPaciente(values);
      request$
        .pipe(
          finalize(() => {
            this.loading = false;
            this.closeModalAndResetForm(false, 'pre-cadastro');
          }),
          untilDestroyed(this)
        )
        .subscribe(
          (response: IUsuarioModel) => {
            this.stepId.emit(idStep);
            this._sweetAlert.openToasty('Cadastro realizado com sucesso!', 'success');
            this.resetForm();
            this.emitUser(response);
          },
          (error) => {
            this.messageError = error?.error?.message;
            console.log(error);
            log.debug(`Error`);
          }
        );
    }
  }

  /**
   *
   * @param user recebe dados do usuário e envia pro componente Pai
   */
  private emitUser(user: IUsuarioModel) {
    if (this.novoPaciente) {
      this.dadosUsuario.emit(user);
    } else {
      this.formPreCadastroPaciente.emit(user);
    }
  }

  private resetForm() {
    this.form.reset();
  }
}

import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ListaUtilitarioMock } from '../../../../../mocks/lista-utilitario-mock';
import { FormPreCadastroPaciente } from '../../../class/form-pre-cadastro-paciente';
import Swal from 'sweetalert2';
import { AgendamentoConsultaService } from '../../../services/agendamento-consulta/agendamento-consulta.service';
import { finalize } from 'rxjs/operators';
import { untilDestroyed } from '../../../../../@core/until-destroyed';
import { Logger } from '../../../../../@core/logger.service';

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
  public readonly _formPreCadastro = new FormPreCadastroPaciente();
  public form: FormGroup;

  public utilitariosMock = new ListaUtilitarioMock();
  public listaSexo: any[];
  public loading = false;

  constructor(private readonly _service: AgendamentoConsultaService) {}

  ngOnDestroy() { }

  ngOnInit(): void {
    this.listaSexo = this.utilitariosMock.getListaSexos();
    this.form = this._formPreCadastro.initFormPreCadastroPaciente();
    console.log('Form Pre Cadastro init >>', this.form.value);
  }

  public closeModalAndResetForm(id: string) {
    this.closeModal.emit({ close: true, modalId: id });
  }

  public setStep(id: number) {
    this.stepId.emit(id);
  }

  public back() {
    if (this.form.invalid) {
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
      this.loading = true; // IMPLEMENTAR LOADING
      const request$ = this._service.submitPreCadastroPaciente(this.form.value);
      request$
        .pipe(
          finalize(() => {
            this.loading = false;
          }),
          untilDestroyed(this)
        )
        .subscribe(
          (response: any) => {
            this.formPreCadastroPaciente.emit(this.form);
            this.stepId.emit(idStep);
          },
          (error) => {
            log.debug(`Error`);
          }
        );
    }
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ListaUtilitarioMock } from '../../../../../mocks/lista-utilitario-mock';
import { FormPreCadastroPaciente } from '../../../class/form-pre-cadastro-paciente';

@Component({
  selector: 'app-form-pre-cadastro-paciente',
  templateUrl: './form-pre-cadastro-paciente.component.html',
  styleUrls: ['./form-pre-cadastro-paciente.component.scss']
})
export class FormPreCadastroPacienteComponent implements OnInit {
  @Output() closeModal = new EventEmitter();
  @Output() stepId = new EventEmitter();
  @Output() formPreCadastroPaciente = new EventEmitter();
  public readonly _formPreCadastro = new FormPreCadastroPaciente();
  public form: FormGroup;

  public utilitariosMock = new ListaUtilitarioMock();
  public listaSexo: any[];
  constructor() { }

  ngOnInit(): void {
    this.listaSexo = this.utilitariosMock.getListaSexos();
    this.form = this._formPreCadastro.initFormPreCadastroPaciente();
    console.log('Form Pre Cadastro init >>', this.form.value);
  }

  public closeModalAndResetForm(id: string) {
    this.closeModal.emit({ close: true, modalId: id});
  }

  public setStep(id: number) {
    this.stepId.emit(id);
  }

  public back() {
    this.stepId.emit(0);
  }

  /**
   *
   * @param idStep: Id do próximo Step
   * @description: Envia o formulário de pré-cadastro e na resposta de sucesso, emite
   * dois eventos: Um pra alterar o formulário e o Outro com o dados do usuário que foi cadastrado
   * pra popular os outros componentes.
   */
  public submitPreCadastroPaciente(idStep: number) {
    this.formPreCadastroPaciente.emit(this.form);
    this.stepId.emit(idStep);
  }

}

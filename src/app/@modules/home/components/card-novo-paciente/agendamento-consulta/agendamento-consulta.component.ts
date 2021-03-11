import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ListaUtilitarioMock } from '../../../../../mocks/lista-utilitario-mock';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-agendamento-consulta',
  templateUrl: './agendamento-consulta.component.html',
  styleUrls: ['./agendamento-consulta.component.scss']
})
export class AgendamentoConsultaComponent implements OnInit, OnChanges {
  @Output() closeModal = new EventEmitter();
  @Output() stepId = new EventEmitter();
  @Input() formConsulta: FormGroup;
  @Input() formPaciente: FormGroup;

  public utilitariosMock = new ListaUtilitarioMock();
  public listaSexo: any[];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
      console.log('ON CHANGE');
  }

  ngOnInit(): void {
    this.listaSexo = this.utilitariosMock.getListaSexos();
    console.log('FORM VINDO DO PAI CARD NOVA CONSULTA>> ', this.formConsulta.value);
    console.log('FORM PRE CADASTRO PACIENTE>> ', this.formPaciente.value);
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

}

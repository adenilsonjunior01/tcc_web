import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ListaUtilitarioMock } from '../../../../mocks/lista-utilitario-mock';
import { ModalAnimationComponent } from '../../../../@shared/modal-animation/modal-animation.component';
import { AnimationOptions } from 'ngx-lottie';
import { IEventCloseModalModel } from '../../models/event-close-modal-model';
import { FormGroup } from '@angular/forms';
import { FormConsultaHome } from '../../class/form-consulta-home';

@Component({
  selector: 'app-card-nova-consulta',
  templateUrl: './card-nova-consulta.component.html',
  styleUrls: ['./card-nova-consulta.component.scss'],
})
export class CardNovaConsultaComponent implements OnInit, AfterViewInit {
  @ViewChild(ModalAnimationComponent) modal: any;

  private readonly _formConsulta = new FormConsultaHome()
  public utilitariosMock = new ListaUtilitarioMock();
  public listaSexo: any[];
  public novoUsuario = false;
  public steps = 0;
  public form: FormGroup;
  public formPreCadastroPaciente: FormGroup;


  public options: AnimationOptions = {
    path: '/assets/lottie/lottie-search.json',
  };

  constructor() {}

  ngAfterViewInit(): void {
    this.modal.show('agendar-consulta');
  }

  ngOnInit(): void {
    this.form = this._formConsulta.initFormConsultaHome();
    this.listaSexo = this.utilitariosMock.getListaSexos();
  }

  public closeModalAndResetForm(event: IEventCloseModalModel): void {
    if (event.close) {
      this.modal.close(event.modalId);
    }
  }

  /**
   * @description:
   * Step 0: Component inicial de busca ou cadastro de Novo usuário
   * Step 1: Formulário de Cadastro Novo Paciente
   * Step 2: Component de Andamento da Consulta
   */
  public setStep(value: number): void {
    this.steps = value;
  }

  // resetar todos os formulários quando o usuário voltar
  public back() {
    this.steps = 0;
  }

  /**
   *
   * @param event recebe o formulário de pré-cadastro do paciente após envio pro back-end
   */
  public getFormPreCadastroPaciente(event: FormGroup) {
    this.formPreCadastroPaciente = event;
  }
}

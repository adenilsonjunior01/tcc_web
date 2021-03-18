import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ListaUtilitarioMock } from '../../../../mocks/lista-utilitario-mock';
import { ModalAnimationComponent } from '../../../../@shared/modal-animation/modal-animation.component';
import { AnimationOptions } from 'ngx-lottie';
import { IEventCloseModalModel } from '../../models/event-close-modal-model';
import { FormControl, FormGroup } from '@angular/forms';
import { FormConsultaHome } from '../../class/form-consulta-home';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card-nova-consulta',
  templateUrl: './card-nova-consulta.component.html',
  styleUrls: ['./card-nova-consulta.component.scss'],
})
export class CardNovaConsultaComponent implements OnInit {
  @ViewChild(ModalAnimationComponent) modal: any;
  @Input() visibleCard = true;

  private readonly _formConsulta = new FormConsultaHome();
  public utilitariosMock = new ListaUtilitarioMock();
  public listaSexo: any[];
  public novoUsuario = false;
  public steps = 0;
  public form: FormGroup;
  paciente: any;
  public search = new FormControl();

  optionsAutoComplete: any[] = [
    {
      nome: 'Alberto',
      sobrenome: 'Souza',
      cpf: '000.000.000-00',
      email: 'teste@teste.com',
      dtNascimento: '1990-12-02',
      sexo: 1,
    },
    {
      nome: 'Two',
      sobrenome: 'Pereira',
      cpf: '111.000.000-00',
      email: 'teste@teste.com',
      dtNascimento: '1990-12-02',
      sexo: 1,
    },
    {
      nome: 'Three',
      sobrenome: 'Santos',
      cpf: '111.222.000-00',
      email: 'teste@teste.com',
      dtNascimento: '1990-12-02',
      sexo: 2,
    },
    {
      nome: 'Four',
      sobrenome: 'Silva',
      cpf: '111.333.000-00',
      email: 'teste@teste.com',
      dtNascimento: '1990-12-02',
      sexo: 2,
    },
  ];
  filteredOptions: Observable<string[]>;

  public options: AnimationOptions = {
    path: '/assets/lottie/lottie-search.json',
  };

  constructor() {}

  ngOnInit(): void {
    this.filteredOptions = this.search.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );

    this.form = this._formConsulta.initFormConsultaHome();
    this.listaSexo = this.utilitariosMock.getListaSexos();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    const dataFilter = this.optionsAutoComplete.filter(
      (option) => option.nome.toLowerCase().indexOf(filterValue) === 0
    );
    return dataFilter;
  }

  public closeModalAndResetForm(event: IEventCloseModalModel): void {
    if (event.close === true) {
      Swal.fire({
        icon: 'info',
        title: 'Deseja continuar?',
        text: 'Ao continuar, essa consulta será desconsiderada.',
        showCancelButton: true,
        confirmButtonText: `Sim`,
        cancelButtonText: `Não`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.steps = 0;
          this.modal.close(event.modalId);
          this.search.reset();
          this.form.reset();
        }
      });
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
  public getFormPreCadastroPaciente(event: any) {
    this.form.controls['paciente'].get('nome').setValue(event.nome);
    this.form.controls['paciente'].get('cpf').setValue(event.cpf);
    this.form.controls['paciente'].get('email').setValue(event.email);
    this.form.controls['paciente'].get('dtNascimento').setValue(event.dtNascimento);
    this.form.controls['paciente'].get('sexo').setValue(event.sexo);
  }

  public submitNovaConsulta(): void {
    if (this.form.valid) {
      console.log('DADOS CONSULTA >>', this.form.value);
    }
  }

  public selectPaciente(): void {
    if (this.search.value) {
      const values = this.optionsAutoComplete.filter(
        (option) => option.nome.toLowerCase().indexOf(this.search.value.toLowerCase()) === 0
      );
      this.setValuesPaciente(values[0]);
      this.steps = 2;
      this.search.reset();
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        confirmButtonText: 'Ok, entendi',
        text: 'Selecione algum paciente que já possua cadastro ou cadastre um novo.',
      });
    }
  }

  private setValuesPaciente(object: any): void {
    this.form.controls['paciente'].get('nome').setValue(object.nome);
    this.form.controls['paciente'].get('sobrenome').setValue(object.sobrenome);
    this.form.controls['paciente'].get('cpf').setValue(object.cpf);
    this.form.controls['paciente'].get('email').setValue(object.email);
    this.form.controls['paciente'].get('dtNascimento').setValue(object.dtNascimento);
    this.form.controls['paciente'].get('sexo').setValue(object.sexo);
  }
}

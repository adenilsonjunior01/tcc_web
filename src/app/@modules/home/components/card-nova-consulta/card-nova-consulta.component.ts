import { Component, Input, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ListaUtilitarioMock } from '../../../../mocks/lista-utilitario-mock';
import { ModalAnimationComponent } from '../../../../@shared/modal-animation/modal-animation.component';
import { AnimationOptions } from 'ngx-lottie';
import { IEventCloseModalModel } from '../../models/event-close-modal-model';
import { FormControl, FormGroup } from '@angular/forms';
import { FormConsultaHome } from '../../class/form-consulta-home';
import { Observable } from 'rxjs';
import { startWith, map, distinctUntilChanged, debounceTime, finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { IPacienteModel } from '../../../../models/paciente-model';
import { untilDestroyed } from '../../../../@core/until-destroyed';
import { PacienteService } from '../../../../services/paciente/paciente.service';
import * as dayjs from 'dayjs';
import { ClinicaService } from '@app/services/clinica/clinica.service';
import { ITiposConsultaModel } from '@app/models/tipos-consulta-model';

@Component({
  selector: 'app-card-nova-consulta',
  templateUrl: './card-nova-consulta.component.html',
  styleUrls: ['./card-nova-consulta.component.scss'],
})
export class CardNovaConsultaComponent implements OnInit, OnDestroy {
  @ViewChild(ModalAnimationComponent) modal: any;
  @Input() visibleCard = true;

  private readonly _formConsulta = new FormConsultaHome();
  public utilitariosMock = new ListaUtilitarioMock();
  public listaSexo: any[];
  public novoUsuario = false;
  public steps = 0;
  public form: FormGroup;
  public search = new FormControl();
  public pacientes: IPacienteModel[] = [];
  public tiposConsulta: ITiposConsultaModel[] = [];
  public loading = false;
  public loading2 = false;
  public pacienteSelecionado: IPacienteModel;
  public horariosDisponiveis: any;
  public resumo: any;

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
  filteredOptions: Observable<any>;

  public options: AnimationOptions = {
    path: '/assets/lottie/lottie-search.json',
  };

  constructor(private readonly _pacienteService: PacienteService, private readonly _clinicaService: ClinicaService) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    let data = new Date();
    this.filteredOptions = this.search.valueChanges.pipe(
      startWith(''),
      debounceTime(600),
      distinctUntilChanged(),
      map((value) => this.getPaciente(value))
    );

    this.form = this._formConsulta.initFormConsultaHome();
    this.listaSexo = this.utilitariosMock.getListaSexos();
    this.form.get('dtInicio').setValue(dayjs(data).format('DD-MM-YYYY'));
    this.getTiposConsulta();
  }

  public getPaciente(name: string): void {
    if (name) {
      this.loading = true;
      this._pacienteService
        .getPaciente(name)
        .pipe(
          untilDestroyed(this),
          finalize(() => (this.loading = false))
        )
        .subscribe({
          next: (body: IPacienteModel[]) => {
            this.pacientes = body;
          },
        });
    }
  }

  public getHorariosDiponiveisConsulta(): void {
    if (this.form.get('dtInicio').valid && this.form.get('idTipoProcedimento').valid) {
      this.loading2 = true;
      this.horariosDisponiveis = [];
      this._clinicaService
        .getHorariosDiponiveisConsulta(this.form.get('dtInicio').value, this.form.get('idTipoProcedimento').value)
        .pipe(
          untilDestroyed(this),
          finalize(() => (this.loading2 = false))
        )
        .subscribe({
          next: (datas: any) => {
            this.horariosDisponiveis = datas;
          },
          error: (err) => {},
        });
    }
  }

  public getTiposConsulta(): void {
    this._clinicaService
      .getTiposConsulta()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (datas: ITiposConsultaModel[]) => {
          this.tiposConsulta = datas;
        },
      });
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
    this.resetForm();
  }

  // resetar todos os formulários quando o usuário voltar
  public back() {
    this.steps = 0;
  }

  /**
   *
   * @param event recebe o formulário de pré-cadastro do paciente após envio pro back-end
   */
  // public getFormPreCadastroPaciente(event: any) {
  //   this.form.controls['paciente'].get('nome').setValue(event.nome);
  //   this.form.controls['paciente'].get('cpf').setValue(event.cpf);
  //   this.form.controls['paciente'].get('email').setValue(event.email);
  //   this.form.controls['paciente'].get('dtNascimento').setValue(event.dtNascimento);
  //   this.form.controls['paciente'].get('sexo').setValue(event.sexo);
  // }

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
      // this.setValuesPaciente(values[0]);
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

  public setValuesPaciente(paciente: IPacienteModel): void {
    this.form.get('idPaciente').setValue(paciente?.idPaciente);
    this.form.controls['paciente']
      .get('idUser')
      .setValue(paciente?.idUser !== undefined ? paciente.idUser : paciente.id);
    this.form.controls['paciente'].get('nome').setValue(paciente?.nome);
    this.form.controls['paciente'].get('cpf').setValue(paciente?.cpf);
    this.form.controls['paciente'].get('compartilhaDados').setValue(paciente?.compartilhaDados);
    this.form.controls['paciente'].get('sexo').setValue(paciente?.sexo);
    this.form.controls['paciente'].get('descConvenio').setValue(paciente?.descConvenio);
    this.form.controls['paciente'].get('nuInscricaoConvenio').setValue(paciente?.nuInscricaoConvenio);
    this.form.controls['paciente'].get('telefone').setValue(paciente?.telefone);
    this.steps = 2;
  }

  public resetForm() {
    this.form.controls['paciente'].reset();
    this.search.reset();
    this.pacientes = [];
  }

  public resumoConsulta(event: any): void {
    this.modal.close('agendar-consulta');
    if (event.agendamento) {
      this.resumo = event.resumo;
      setTimeout(() => this.modal.show('resumo-consulta'), 400);
    }
  }
}

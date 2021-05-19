import { Component, OnInit, OnDestroy } from '@angular/core';
import { DadosPaciente } from '../../class/dados-paciente';
import { Router, Route } from '@angular/router';
import { OptionsRadioButton } from '../../mocks/options-radio-button';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { FormProntuario } from '../../class/form-prontuario';
import { IOptionsRadioButton } from '../../interfaces/options-radio-button-interface';
import { SweetalertService } from '@app/@shared/sweetalert/sweetalert.service';
import { AlergiaService } from '../../../../services/alergia/alergia.service';
import { untilDestroyed } from '../../../../@core/until-destroyed';
import { finalize } from 'rxjs/operators';
import { ITipoAlergiaModel } from '@app/models/tipo-alergia-model';
import { Logger } from '../../../../@core/logger.service';
import { FileUploadControl, FileUploadValidators } from '@iplab/ngx-file-upload';
import { ClinicaService } from '@app/services/clinica/clinica.service';
import { IClinicaModel } from '../../../../models/clinica-model';
import { CredentialsService } from '../../../../auth/credentials.service';
import Swal from 'sweetalert2';

const log = new Logger('Prontuario');

@Component({
  selector: 'app-prontuario-medico-paciente',
  templateUrl: './prontuario-medico-paciente.component.html',
  styleUrls: ['./prontuario-medico-paciente.component.scss'],
})
export class ProntuarioMedicoPacienteComponent implements OnInit, OnDestroy {
  private readonly _dadosProntuarioPaciente = new DadosPaciente();
  public dadosProntuario: any;
  public step = 0;
  public formProntuario: FormGroup;
  public optionsRadio: IOptionsRadioButton[];
  public configForm = new FormProntuario();
  public controlAlergia = new FormControl();
  public controlMedicamento = new FormControl();
  public controlDoencaCronica = new FormControl();
  public loading = false;
  public tiposAlergias: ITipoAlergiaModel[] = [];
  public visibleAlertAccordionAlergia = false;
  public visibleAlertAccordionMedicamento = false;
  public visibleAlertAccordionDoenca = false;
  public animationFile = false;
  public dadosClinica: IClinicaModel;
  public nomeMedico: string;

  public files = new FileUploadControl(
    // control configuration
    { listVisible: true, discardInvalid: true, accept: ['image/*'] },

    // validator used to discard files
    [FileUploadValidators.accept(['image/*']), FileUploadValidators.fileSize(80000)]
  );

  constructor(
    private readonly _router: Router,
    private readonly _sweetAlert: SweetalertService,
    private readonly _alergiaService: AlergiaService,
    private readonly _clinicaService: ClinicaService,
    private readonly _credentials: CredentialsService
  ) {
    const state = this._router.getCurrentNavigation();
    if (state?.extras?.state) {
      this._dadosProntuarioPaciente.setDadosProntuarioLocalStorage(state.extras.state);
      this.dadosProntuario = state.extras.state;
    } else {
      this.dadosProntuario = this._dadosProntuarioPaciente.getDadosProntuarioLocalStorage();
    }
  }

  ngOnDestroy(): void {
    // this._dadosProntuarioPaciente.removeDadosProntuarioLocalStorage();
  }

  ngOnInit(): void {
    this.nomeMedico = this._credentials.decodeToken().nome;
    this.getDadosClinica();
    this.getTiposAlergias();
    this.optionsRadio = OptionsRadioButton.optionsRadio;
    this.formProntuario = this.configForm.initFormProntuario();
    this.formProntuario.get('id').setValue(this.dadosProntuario.id);
    this.controlAlergia.setValue(false);
    this.controlMedicamento.setValue(false);
    this.controlDoencaCronica.setValue(false);
  }

  public get formArrayAlergia() {
    return this.formProntuario.get('alergias') as FormArray;
  }

  public get formArrayMedicamento() {
    return this.formProntuario.get('medicamentos') as FormArray;
  }

  public get formArrayDoencaCronica() {
    return this.formProntuario.get('doencas') as FormArray;
  }

  public get formArrayArquivos() {
    return this.formProntuario.get('arquivos').value;
  }

  public confirmEnvio() {
    Swal.fire({
      icon: 'info',
      title: 'Deseja continuar?',
      text: 'Ao continuar, a consulta será finalizada e o Prontuário registrado.',
      showCancelButton: true,
      confirmButtonText: `Sim`,
      cancelButtonText: `Não`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.salvarProntuario();
      }
    });
  }

  private salvarProntuario(): void {
    const values = this.configForm.parseFormSubmit(
      this.formProntuario.value,
      this.dadosProntuario.consulta.paciente.id
    );
    this._clinicaService
      .salvarProntuarioMedico(values)
      .pipe(
        untilDestroyed(this),
        finalize(() => (this.loading = false))
      )
      .subscribe({
        next: (body: any) => {
          this._sweetAlert.openToasty('Prontuário salvo com sucesso!', 'success');
          setTimeout(() => this._router.navigateByUrl('/pacientes'), 1500);
        },
        error: (error: any) => {
          log.error(error);
        },
      });
  }

  public getDadosClinica(): void {
    this._clinicaService
      .getDadosClinica()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (body: IClinicaModel) => {
          this.dadosClinica = body;
        },
      });
  }

  /**
   * @description: Adiciona novo objeto de Medicamento
   */
  public addNewObjectControlMedicamento(value: any, control: string) {
    if (this.formProntuario.controls[control].valid) {
      (this.formProntuario.get(control) as FormArray).push(this.configForm.newObjectControlMedicamento());
      this.validatorsDynamic(value, control);
    } else {
      const controle = this.formProntuario.controls[control] as FormGroup;
      this.configForm.validateControlAlergias(controle);
    }
  }

  /**
   * @description: Adiciona novo objeto de Alergia
   */
  public addNewObjectControlAlergia(value: any, control: string) {
    if (this.formProntuario.controls[control].valid) {
      (this.formProntuario.get(control) as FormArray).push(this.configForm.newObjectControlAlergia());
      this.validatorsDynamic(value, control);
    } else {
      const controle = this.formProntuario.controls[control] as FormGroup;
      this.configForm.validateControlAlergias(controle);
    }
  }

  /**
   * @description: Adiciona novo objeto de Doenca Cronica
   */
  public addNewObjectControlDoencaCronica(value: any, control: string) {
    if (this.formProntuario.controls[control].valid) {
      (this.formProntuario.get(control) as FormArray).push(this.configForm.newObjectControlDoencaCronica());
      this.validatorsDynamic(value, control);
    } else {
      const controle = this.formProntuario.controls[control] as FormGroup;
      this.configForm.validateControlAlergias(controle);
    }
  }

  /**
   * @description: remove objeto do FormProntuario de acordo com o Control
   */
  public removeObject(index: number, control: string): void {
    (this.formProntuario.get(control) as FormArray).removeAt(index);
  }

  public removeFile(event: any): void {
    (this.formProntuario.get('arquivos') as FormArray).removeAt(1);
  }

  public validatorsDynamic(value: boolean, control?: string): void {
    if ((this.formProntuario.controls[control] as FormArray).length === 0 && value) {
      this.addControl(value, control);
    } else if (!value) {
      this.remove(control);
    } else {
      let form;
      (this.formProntuario.get(control) as FormArray).controls.forEach((_, index) => {
        form = this.configForm.addValidatorDynamic(this.formProntuario, index, control, value);
      });
      this.formProntuario = form;
    }
  }

  private addControl(value: boolean, control?: string): void {
    if (control === 'alergias') {
      this.addNewObjectControlAlergia(value, control);
    } else if (control === 'medicamentos') {
      this.addNewObjectControlMedicamento(value, control);
    } else if (control === 'doencas') {
      this.addNewObjectControlDoencaCronica(value, control);
    }
  }

  private remove(control: string) {
    let form = this.formProntuario.controls[control] as FormArray;
    const count = form.controls.length;
    for (let i = 0; i <= count; i++) {
      this.removeObject(0, control);
    }
  }

  public setStep(index: number) {
    this.step = index;
  }

  public nextStep() {
    this.step++;
  }

  public prevStep() {
    this.step--;
  }

  public getTiposAlergias(): void {
    this._alergiaService
      .getTiposAlergias()
      .pipe(untilDestroyed(this))
      .subscribe({ next: (body: ITipoAlergiaModel[]) => (this.tiposAlergias = body) });
  }

  public navigateDadosCompartilhadosPaciente(): void {
    this._router.navigate(['/pacientes/dados-medicos'], { state: this.dadosProntuario });
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { DadosPaciente } from '../../class/dados-paciente';
import { Router } from '@angular/router';
import { OptionsRadioButton } from '../../mocks/options-radio-button';
import { FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
import { FormProntuario } from '../../class/form-prontuario';
import { IOptionsRadioButton } from '../../interfaces/options-radio-button-interface';
import { SweetalertService } from '@app/@shared/sweetalert/sweetalert.service';
import { AlergiaService } from '../../../../services/alergia/alergia.service';
import { MedicamentoService } from '../../../../services/medicamento/medicamento.service';
import { DoencaCronicaService } from '../../../../services/doenca-cronica/doenca-cronica.service';
import { untilDestroyed } from '../../../../@core/until-destroyed';
import { finalize } from 'rxjs/operators';
import { ITipoAlergiaModel } from '@app/models/tipo-alergia-model';
import { Logger } from '../../../../@core/logger.service';

const log = new Logger('Prontuario');

@Component({
  selector: 'app-prontuario-medico-paciente',
  templateUrl: './prontuario-medico-paciente.component.html',
  styleUrls: ['./prontuario-medico-paciente.component.scss'],
})
export class ProntuarioMedicoPacienteComponent implements OnInit, OnDestroy {
  private readonly _dadosProntuarioPaciente: any;
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

  constructor(
    private readonly _router: Router,
    private readonly _sweetAlert: SweetalertService,
    private readonly _alergiaService: AlergiaService,
    private readonly _medicamentoService: MedicamentoService,
    private readonly _doencaCronicaService: DoencaCronicaService
  ) {
    this._dadosProntuarioPaciente = new DadosPaciente();
    const state = this._router.getCurrentNavigation();
    if (state?.extras?.state) {
      this._dadosProntuarioPaciente.setDadosProntuarioLocalStorage(state.extras.state);
      this.dadosProntuario = state.extras.state;
    } else {
      this.dadosProntuario = this._dadosProntuarioPaciente.getDadosProntuarioLocalStorage();
    }
  }

  ngOnDestroy(): void {
    this._dadosProntuarioPaciente.removeDadosProntuarioLocalStorage();
  }

  ngOnInit(): void {
    this.getTiposAlergias();
    this.optionsRadio = OptionsRadioButton.optionsRadio;
    this.formProntuario = this.configForm.initFormProntuario();
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
    return this.formProntuario.get('doencaCronica') as FormArray;
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
    } else if (control === 'doencaCronica') {
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

  // TODO: Crud de Alergias

  public getTiposAlergias(): void {
    this._alergiaService
      .getTiposAlergias()
      .pipe(untilDestroyed(this))
      .subscribe({ next: (body: ITipoAlergiaModel[]) => (this.tiposAlergias = body) });
  }

  public submitAlergia(): void {
    if (this.formProntuario.valid && this.formProntuario.get('alergias').value.length > 0) {
      this.visibleAlertAccordionAlergia = false;
      const values = this.configForm.parseForm(1, this.formProntuario.value);
      this._alergiaService
        .saveAlergia(values)
        .pipe(
          untilDestroyed(this),
          finalize(() => (this.loading = false))
        )
        .subscribe({
          next: () => {
            this._sweetAlert.openToasty('Alergia cadastrada com sucesso', 'success');
            this.nextStep();
          },
          error: () => {
            log.error('erro ao cadastrar alergia');
          },
        });
    } else {
      if (!this.formProntuario.get('alergias').valid) {
        this.visibleAlertAccordionAlergia = true;
      } else {
        this.visibleAlertAccordionAlergia = false;
      }
      this.nextStep();
    }
  }

  public updateAlergia(): void {}

  public removeAlergia(): void {}

  // TODO: Crud de Medicamentos

  public submitMedicamento(): void {
    if (this.formProntuario.valid && this.formProntuario.get('medicamentos').value.length > 0) {
      this.visibleAlertAccordionMedicamento = false;
      const values = this.configForm.parseForm(2, this.formProntuario.value);
      this._medicamentoService
        .saveMedicamento(values)
        .pipe(
          untilDestroyed(this),
          finalize(() => (this.loading = false))
        )
        .subscribe({
          next: () => {
            this._sweetAlert.openToasty('Medicamento cadastrado com sucesso', 'success');
            this.nextStep();
          },
          error: () => {
            log.error('erro ao cadastrar medicamento');
          },
        });
    } else {
      if (!this.formProntuario.get('medicamentos').valid) {
        this.visibleAlertAccordionMedicamento = true;
      } else {
        this.visibleAlertAccordionMedicamento = false;
      }
      this.nextStep();
    }
  }

  public updateMedicamento(): void {}

  public removeMedicamento(): void {}

  // TODO: Crud Doenças crônica

  public submitDoencasCronicas(): void {
    if (this.formProntuario.valid && this.formProntuario.get('doencaCronica').value.length > 0) {
      const values = this.configForm.parseForm(3, this.formProntuario.value);
      this._medicamentoService
        .saveMedicamento(values)
        .pipe(
          untilDestroyed(this),
          finalize(() => (this.loading = false))
        )
        .subscribe({
          next: () => {
            this._sweetAlert.openToasty('Doença Crônica cadastrada com sucesso', 'success');
            this.nextStep();
          },
          error: () => {
            log.error('erro ao cadastrar Doença Crônica');
          },
        });
    } else {
      if (!this.formProntuario.get('doencaCronica').valid) {
        this.visibleAlertAccordionDoenca = true;
      } else {
        this.visibleAlertAccordionDoenca = false;
      }
      this.nextStep();
    }
  }

  public updateDoencasCronicas(): void {}

  public removeDoencasCronicas(): void {}
}

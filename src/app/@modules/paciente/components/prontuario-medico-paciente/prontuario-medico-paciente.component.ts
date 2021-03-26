import { Component, OnInit, OnDestroy } from '@angular/core';
import { DadosPaciente } from '../../class/dados-paciente';
import { Router } from '@angular/router';
import { OptionsRadioButton } from '../../mocks/options-radio-button';
import { FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
import { FormProntuario } from '../../class/form-prontuario';
import { IOptionsRadioButton } from '../../interfaces/options-radio-button-interface';

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

  constructor(private readonly _router: Router) {
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
   * @description: Adiciona novo objeto de Alergia
   */
  public addNewObjectControl(value: any, control: string) {
    if (this.formProntuario.controls[control].valid) {
      (this.formProntuario.get(control) as FormArray).push(this.configForm.newObjectControl());
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
      this.addNewObjectControl(value, control);
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
}

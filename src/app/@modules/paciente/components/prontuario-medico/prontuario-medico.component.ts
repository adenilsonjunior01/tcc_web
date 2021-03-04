import { Component, OnInit, OnDestroy } from '@angular/core';
import { DadosPaciente } from '../../class/dados-paciente';
import { Router } from '@angular/router';
import { OptionsRadioButton } from '../../mocks/options-radio-button';
import { FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
import { FormProntuario } from '../../class/form-prontuario';
import { IOptionsRadioButton } from '../../interfaces/options-radio-button-interface';

@Component({
  selector: 'app-prontuario-medico',
  templateUrl: './prontuario-medico.component.html',
  styleUrls: ['./prontuario-medico.component.scss'],
})
export class ProntuarioMedicoComponent implements OnInit, OnDestroy {
  private readonly _dadosProntuarioPaciente: any;
  public dadosProntuario: any;
  public step = 0;
  public formProntuario: FormGroup;
  public optionsRadio: IOptionsRadioButton[];
  public configForm = new FormProntuario();
  public controlAlergia = new FormControl();

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
  }

  public get formDataAlergia() {
    if (this.formProntuario) {
      return this.formProntuario.get('alergias') as FormArray;
    }
  }

  public addNewAlergia(control: string) {
    if (this.formProntuario.valid) {
      (this.formProntuario.get(control) as FormArray).push(this.configForm.newAlergia());
      this.validatorsDynamic(this.controlAlergia.value);
    } else {
      const control = this.formProntuario.controls['alergias'] as FormGroup;
      this.configForm.validateControlAlergias(control);
    }
  }

  public removeAlergia(index: number): void {
    (this.formProntuario.get('alergias') as FormArray).removeAt(index);
  }

  public validatorsDynamic(value: any): void {
    let form;
    (this.formProntuario.get('alergias') as FormArray).controls.forEach((_, index) => {
      form = this.configForm.addValidatorDynamic(this.formProntuario, index, 'alergias', value);
    });
    this.formProntuario = form;
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

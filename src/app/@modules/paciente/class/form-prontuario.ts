import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

export class FormProntuario {
  form: FormGroup;
  private readonly _fb = new FormBuilder();

  constructor() {}

  public initFormProntuario(): FormGroup {
    return this._fb.group({
      descConsulta: [null, Validators.required],
      descSumario: [null],
      arquivos: [null],
      alergias: this._fb.array([]),
      medicamentos: this._fb.array([]),
      doencas: this._fb.array([]),
    });
  }

  public newObjectControlMedicamento(): FormGroup {
    return this._fb.group({
      desc: [null],
      duracaoTratamento: [null],
    });
  }

  public newObjectControlDoencaCronica(): FormGroup {
    return this._fb.group({
      descDoenca: [null],
    });
  }

  public newObjectControlAlergia(): FormGroup {
    return this._fb.group({
      descAlergia: [null],
      idTipoAlergia: [null],
    });
  }

  public validateControlAlergias(values: FormGroup): any {
    Object.keys(values.controls).forEach((campo) => {
      const controle = values.get(campo);
      controle.markAllAsTouched();
    });
  }

  /**
   * @description: adiciona ou remove validação dinamica do control enviado
   */
  public addValidatorDynamic(form: FormGroup, index: number, control: any, status: boolean): FormGroup {
    if (status) {
      Object.keys(((form.controls[control] as FormGroup).controls[index] as FormGroup).controls).forEach((campo) => {
        (form.controls[control] as FormGroup).controls[index].get(campo).setValidators([Validators.required]);
        (form.controls[control] as FormGroup).controls[index].get(campo).updateValueAndValidity();
      });
      return form;
    } else {
      Object.keys(((form.controls[control] as FormGroup).controls[index] as FormGroup).controls).forEach((campo) => {
        (form.controls[control] as FormGroup).controls[index].get(campo).clearValidators();
        (form.controls[control] as FormGroup).controls[index].get(campo).updateValueAndValidity();
      });
      return form;
    }
  }

  /**
   *
   * @param form
   * @param tipo: tipo 1 alergia, tipo 2 medicamento, tipo 3 doenca cronica
   */
  public parseForm(tipo: number, form: any): any {
    let values = Object.assign(form, {});

    if (tipo === 1) {
      return values.alergias;
    } else if (tipo === 2) {
      return values.medicamentos;
    } else {
      return values.doencaCronica;
    }
  }
}

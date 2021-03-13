import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

export class FormProntuario {
  form: FormGroup;
  private readonly _fb = new FormBuilder();

  constructor() {}

  public initFormProntuario(): FormGroup {
    return this._fb.group({
      alergias: this._fb.array([]),
      medicamentos: this._fb.array([]),
      doencaCronica: this._fb.array([]),
    });
  }

  public newObjectControl(): FormGroup {
    return this._fb.group({
      descricao: [null],
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
}

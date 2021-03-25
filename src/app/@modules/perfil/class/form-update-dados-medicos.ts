import { FormBuilder, FormGroup } from '@angular/forms';

export class FormUpdateDadosMedicos {
  private readonly _fb = new FormBuilder();

  constructor() {}

  public initForm(): FormGroup {
    const form = this._fb.group({
      tipoSanguineo: [null],
      altura: [null],
      peso: [null],
    });
    return form;
  }
}

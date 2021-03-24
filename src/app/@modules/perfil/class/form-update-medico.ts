import { FormGroup, FormBuilder } from '@angular/forms';

export class FormUpdateMedico {
  private readonly _fb = new FormBuilder();

  constructor() {}

  public initForm(): FormGroup {
    const form = this._fb.group({
      idUser: [null],
      crm: [null],
      especializacoes: this._fb.array([]),
    });
    return form;
  }

  public newEspecializacao(): FormGroup {
    return this._fb.group({
      id: [null],
    });
  }
}

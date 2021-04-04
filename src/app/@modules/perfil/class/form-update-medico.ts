import { FormGroup, FormBuilder } from '@angular/forms';

export class FormUpdateMedico {
  private readonly _fb = new FormBuilder();

  constructor() {}

  public initForm(): FormGroup {
    const form = this._fb.group({
      idUser: [null],
      crm: [null],
      hrEntrada: [null],
      hrSaida: [null],
      especializacoes: this._fb.array([]),
    });
    return form;
  }

  public newEspecializacao(): FormGroup {
    return this._fb.group({
      id: [null],
    });
  }

  public parserForm(form: any): any {
    let valuesSubmit = Object.assign(form, {});
    const values = valuesSubmit.especializacoes.map((value: any) => value.id);
    valuesSubmit = Object.assign(valuesSubmit, {
      especializacoes: values,
    });

    return valuesSubmit;
  }
}

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class FormCadastroMedico {
  private readonly _fb = new FormBuilder();

  constructor() {}

  public initForm(): FormGroup {
    return this._fb.group({
      idUser: [null, Validators.required],
      crm: [null, Validators.required],
      especializacoes: this._fb.array([this.newEspecializacao()]),
    });
  }

  public newEspecializacao(): FormGroup {
    return this._fb.group({
      id: [null, Validators.required],
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

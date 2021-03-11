import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class FormPreCadastroPaciente {

  private readonly _fb = new FormBuilder;

  constructor() { }

  public initFormPreCadastroPaciente(): FormGroup {
    const form = this._fb.group({
      nome: [null, Validators.required],
      sobrenome: [null, Validators.required],
      cpf: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]]
    });
    return form;
  }
}

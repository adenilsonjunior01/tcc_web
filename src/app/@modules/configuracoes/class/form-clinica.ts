import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class FormClinica {
  private readonly _fb = new FormBuilder();

  constructor() {}

  public iniForm(): FormGroup {
    const form = this._fb.group({
      id: [null],
      nome: [null],
      dtAbertura: [null, Validators.required],
      dtEncerramento: [null, Validators.required],
      endereco: this._fb.group({
        id: [null],
        nuCep: [null],
        descBairro: [null],
        descRua: [null],
        descComplemento: [null],
        numero: [null],
        noCidade: [null],
        noEstado: [null],
      }),
    });
    return form;
  }
}

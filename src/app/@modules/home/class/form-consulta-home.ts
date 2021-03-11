import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class FormConsultaHome {

  private readonly _fb = new FormBuilder;

  constructor() {}

  public initFormConsultaHome(): FormGroup {
    return this._fb.group({
      tipoConsulta: [null, Validators.required],
      data: [null, Validators.required],
      horario: [null, Validators.required],
      sintomas: [null],
      paciente: this._fb.group({
        nome: [null],
        sobrenome: [null],
        cpf: [null],
        email: [null]
      })
    });
  }
}

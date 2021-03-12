import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class FormConsultaHome {

  private readonly _fb = new FormBuilder;

  constructor() {}

  public initFormConsultaHome(): FormGroup {
    return this._fb.group({
      tipoConsulta: [null, Validators.required],
      procedimento: [null, Validators.required],
      data: [null, Validators.required],
      horario: [null, Validators.required],
      sintomas: [null],
      paciente: this._fb.group({
        nome: [null, Validators.required],
        sobrenome: [null, Validators.required],
        cpf: [null, Validators.required],
        email: [null, Validators.required],
        dtNascimento: [null, Validators.required],
        sexo: [null, Validators.required]
      })
    });
  }
}

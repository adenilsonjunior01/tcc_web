import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class FormConsultaHome {
  private readonly _fb = new FormBuilder();

  constructor() {}

  public initFormConsultaHome(): FormGroup {
    return this._fb.group({
      tipoConsulta: [null, Validators.required],
      especializacao: [null, Validators.required],
      medico: [null, Validators.required],
      data: [null, Validators.required],
      horario: [null, Validators.required],
      observacao: [null],
      paciente: this._fb.group({
        idUser: [null],
        nome: [null],
        cpf: [null],
        compartilhaDados: [null],
        sexo: [null],
        descConvenio: [null],
        nuInscricaoConvenio: [null],
        telefone: [null],
      }),
    });
  }
}

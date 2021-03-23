import { FormBuilder, FormGroup } from '@angular/forms';

export class FormUpdatePaciente {
  private readonly _fb = new FormBuilder();

  constructor() {}

  public initForm(): FormGroup {
    const form = this._fb.group({
      idUser: [null],
      idPaciente: [null],
      descConvenio: [null],
      nuInscricaoConvenio: [null],
    });

    return form;
  }
}

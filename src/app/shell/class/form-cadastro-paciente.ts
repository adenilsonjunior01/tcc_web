import { FormBuilder, FormGroup, Validators } from '@angular/forms';
export class FormCadastroPaciente {
  private readonly _fb = new FormBuilder();

  constructor() {}

  public initForm(): FormGroup {
    return this._fb.group({
      id: [null, Validators.required],
      idUser: [null, Validators.required],
      nuInscricaoConvenio: [null, Validators.required],
      descConvenio: [null, Validators.required],
    });
  }
}

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidations } from '../../../@shared/class/form-validations';

export class FormPreCadastroPaciente {

  private readonly _fb = new FormBuilder;

  constructor() { }

  public initFormPreCadastroPaciente(): FormGroup {
    const form = this._fb.group({
      nome: [null, Validators.required],
      sobrenome: [null, Validators.required],
      cpf: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      sexo: [null, Validators.required],
      dtNascimento: [null, [Validators.required, FormValidations.dateValidator]]
    });
    return form;
  }
}

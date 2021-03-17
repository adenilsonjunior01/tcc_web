import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidations } from '../../../@shared/class/form-validations';
import * as dayjs from 'dayjs';

export class FormPreCadastroPaciente {
  private readonly _fb = new FormBuilder();

  constructor() {}

  public initFormPreCadastroPaciente(): FormGroup {
    const form = this._fb.group({
      nome: [null, Validators.required],
      cpf: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      sexo: [null, Validators.required],
      dtNascimento: [null, [Validators.required, FormValidations.dateValidator]],
      perfil: [3, { disabled: true }], // ID do Paciente
      senha: [null],
      telefone: [null, Validators.required],
      endereco: [null],
    });
    return form;
  }

  public parseFormPrecadastroPaciente(form: any): any {
    let values = Object.assign(form, {});
    values.dtNascimento = dayjs(values.dtNascimento).format('DD-MM-YYYY');
    return values;
  }
}

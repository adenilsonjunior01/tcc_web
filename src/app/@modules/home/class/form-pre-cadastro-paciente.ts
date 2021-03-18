import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidations } from '../../../@shared/class/form-validations';
import * as dayjs from 'dayjs';

export class FormPreCadastroPaciente {
  private readonly _fb = new FormBuilder();

  constructor() {}

  public initFormPreCadastroPaciente(): FormGroup {
    const form = this._fb.group({
      nome: ['Teste', Validators.required],
      cpf: ['66138051068', Validators.required],
      email: [null, [Validators.required, Validators.email]],
      sexo: ['m', Validators.required],
      dtNascimento: [null, [Validators.required, FormValidations.dateValidator]],
      perfil: [3, { disabled: true }], // ID do Paciente
      senha: [null],
      telefone: ['99999999999', Validators.required],
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

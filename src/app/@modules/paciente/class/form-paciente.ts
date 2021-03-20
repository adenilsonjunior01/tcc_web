import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FormValidations } from '../../../@shared/class/form-validations';
import * as dayjs from 'dayjs';

export class FormPaciente {
  private readonly _fb = new FormBuilder();

  constructor() {}

  public initForm(): FormGroup {
    const form = this._fb.group({
      nome: ['Teste', Validators.required],
      cpf: ['66138051068', Validators.required],
      email: [null, [Validators.required, Validators.email]],
      sexo: ['m', Validators.required],
      dtNascimento: [null, [Validators.required, FormValidations.dateValidator]],
      perfil: [null],
      senha: [null],
      telefone: ['99999999999', Validators.required],
      endereco: this._fb.group({
        descBairro: [null],
        descRua: [null],
        noEstado: [null],
        noCidade: [null],
        nuCep: [null],
        numero: [null],
      }),
    });
    return form;
  }

  public parseFormPaciente(form: any): any {
    let values = Object.assign(form, {});
    values.dtNascimento = dayjs(values.dtNascimento).format('DD-MM-YYYY');
    values.perfil = 3;
    return values;
  }
}

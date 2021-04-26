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
      perfil: [null],
      senha: [null],
      telefone: [null, Validators.required],
      idPaciente: [null],
      id: [null],
      nuInscricaoConvenio: [null],
      descConvenio: [null],
      compartilhaDados: [false],
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

  public parseFormPrecadastroPaciente(form: any): any {
    let values = Object.assign(form, {});
    values.dtNascimento = dayjs(values.dtNascimento).format('MM-DD-YYYY');
    values.endereco = null;
    values.perfil = 3;
    return values;
  }

  public parseFormColaborador(form: any): any {
    let values = Object.assign(form, {});
    values.dtNascimento = dayjs(values.dtNascimento).format('MM-DD-YYYY');
    return values;
  }
}

import { FormControl } from '@angular/forms';
import * as dayjs from 'dayjs';

export class FormValidations {
  static getErrorMessage(
    fieldName: string,
    validatorName: string,
    validatorValue?: any,
    message?: string
  ): any {
    const config = {
      required: `${fieldName} é um campo obrigatório.`,
      minlength: `${fieldName} precisa ter no mínimo ${validatorValue.requiredLength} dígitos.`,
      maxlength: `${fieldName} precisa ter no máximo ${validatorValue.requiredLength} dígitos.`,
      min: `O valor mínimo do ${fieldName} é de ${validatorValue.min}.`,
      max: `O valor máximo do ${fieldName} é de ${validatorValue.max}.`,
      email: "E-mail inválido",
      cepInvalido: "CEP inválido.",
      equalsTo: "Campos não são iguais",
      pattern: "Campo inválido",
      dateValidator: "Data inválida",
      cpf: "CPF inválido",
    };
    return config[validatorName];
  }

  static cepValidator(control: FormControl) {
    const cep = control.value;
    if (cep && cep !== "") {
      const validacep = /^[0-9]{8}$/;
      return validacep.test(cep) ? null : { cepInvalido: true };
    }
    return null;
  }

  static dateValidator(date: FormControl) {
    if (date && date.value && !dayjs(date.value, "DD/MM/YYYY", true).isValid()) {
      let ptDatePattern =  /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;
      if (!date.value.match(ptDatePattern))
      return { dateValidator: true };
      return null;
    }
    return null;
  }

  static cpfValidator(control: FormControl): any {
    if (!control.value) {
      return null;
    }
    const cpf = control.value.replace(/\D/g, '');
    if (cpf.toString().length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return { invalidCpf: true };
    }
    let result = null;

    [9, 10].forEach((j: any) => {
      let soma = 0;
      let r;
      cpf
        .split(/(?=)/)
        .splice(0, j)
        .forEach((e: any, i: any) => {
          soma += Number(e) * (j + 2 - (i + 1));
        });
      r = soma % 11;
      r = r < 2 ? 0 : 11 - r;
      if (r !== Number(cpf.substring(j, j + 1))) {
        result = { cpf: true };
      }
    });
    return result;
  }
}

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidations } from '../../../@shared/class/form-validations';
import * as dayjs from 'dayjs';

export class FormUpdateUser {
    private readonly _fb = new FormBuilder();

    constructor() {}

    public initForm(): FormGroup {
        const form = this._fb.group({
            nome: [null, Validators.required],
            cpf: [null, Validators.required],
            email: [null],
            sexo: [null, Validators.required],
            dtNascimento: [null, [Validators.required]],
            telefone: [null, Validators.required],
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

    public parseForm(form: any): any {
        let values = Object.assign(form, {});
        values.dtNascimento = values.dtNascimento = values.dtNascimento.split('/').join('-');
        values.sexo = values.sexo.toLowerCase();
        return values;
    }
}

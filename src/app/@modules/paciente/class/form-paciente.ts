import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FormValidations } from '../../../@shared/class/form-validations';
import * as dayjs from 'dayjs';

export class FormPaciente {
    private readonly _fb = new FormBuilder();

    constructor() {}

    public initForm(): FormGroup {
        const form = this._fb.group({
            nome: [null, Validators.required],
            cpf: [null, Validators.required],
            email: [null, [Validators.required, Validators.email]],
            sexo: [null, Validators.required],
            dtNascimento: [null, [Validators.required]],
            perfil: [null],
            senha: [null],
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

    public parseFormPaciente(form: any): any {
        let values = Object.assign(form, {});
        values.dtNascimento = dayjs(values.dtNascimento).format('MM-DD-YYYY');
        values.perfil = 3;
        return values;
    }
}

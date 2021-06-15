import { FormBuilder, FormGroup } from '@angular/forms';

export class FormUpdateDadosMedicos {
    private readonly _fb = new FormBuilder();

    constructor() {}

    public initForm(): FormGroup {
        const form = this._fb.group({
            tipoSanguineo: [null],
            altura: [null],
            peso: [null],
        });
        return form;
    }

    public parserForm(form: any): any {
        let valuesSubmit = Object.assign(form, {});
        valuesSubmit.peso = parseFloat(valuesSubmit.peso);
        valuesSubmit.altura = parseFloat(valuesSubmit.altura);

        return valuesSubmit;
    }
}

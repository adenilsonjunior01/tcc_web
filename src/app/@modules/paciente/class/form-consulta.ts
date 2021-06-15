import { FormBuilder, FormGroup } from '@angular/forms';

export class FormConsulta {
    form: FormGroup;
    private readonly _fb = new FormBuilder();

    constructor() {}

    public initFormConsulta(): FormGroup {
        return this._fb.group({});
    }

    public parserDatas(): any {}
}

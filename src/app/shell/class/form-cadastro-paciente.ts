import { FormBuilder, FormGroup, Validators } from '@angular/forms';
export class FormCadastroPaciente {
    private readonly _fb = new FormBuilder();

    constructor() {}

    public initForm(): FormGroup {
        return this._fb.group({
            idUser: [null],
            nuInscricaoConvenio: [null],
            descConvenio: [null],
            compartilhaDados: [false],
        });
    }
}

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as dayjs from 'dayjs';

export class FormConsultaHome {
    private readonly _fb = new FormBuilder();

    constructor() {}

    public initFormConsultaHome(): FormGroup {
        return this._fb.group({
            idTipoProcedimento: [null, Validators.required], // pl
            especializacao: [null, Validators.required],
            idMedico: [null], // ok
            idPaciente: [null], // ok
            dtInicio: [null, Validators.required],
            horario: [null, Validators.required],
            observacao: [null],
            paciente: this._fb.group({
                idUser: [null],
                nome: [null],
                cpf: [null],
                compartilhaDados: [null],
                sexo: [null],
                descConvenio: [null],
                nuInscricaoConvenio: [null],
                telefone: [null],
            }),
        });
    }

    public parseForm(form: any): any {
        let values = Object.assign(form, {});
        values.dtInicio = `${values.dtInicio.split('-').reverse().join('-')} ${values.horario}`;

        delete values.especializacao;
        delete values.paciente;
        delete values.horario;
        return values;
    }
}

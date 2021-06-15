import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FileUploadValidators } from '@iplab/ngx-file-upload';

export class FormProntuario {
    form: FormGroup;
    private readonly _fb = new FormBuilder();

    constructor() {}

    public initFormProntuario(): FormGroup {
        return this._fb.group({
            id: [null],
            descConsulta: [null, Validators.required],
            descSumario: [null],
            arquivos: [null],
            diagnostico: [null],
            alergias: this._fb.array([]),
            medicamentos: this._fb.array([]),
            doencas: this._fb.array([]),
        });
    }

    public newObjectControlMedicamento(): FormGroup {
        return this._fb.group({
            desc: [null],
            duracaoTratamento: [null],
            dosagem: [null],
        });
    }

    public newObjectControlDoencaCronica(): FormGroup {
        return this._fb.group({
            descDoenca: [null],
        });
    }

    public newObjectControlAlergia(): FormGroup {
        return this._fb.group({
            descAlergia: [null],
            idTipoAlergia: [null],
        });
    }

    public validateControlAlergias(values: FormGroup): any {
        Object.keys(values.controls).forEach((campo) => {
            const controle = values.get(campo);
            controle.markAllAsTouched();
        });
    }

    /**
     * @description: adiciona ou remove validação dinamica do control enviado
     */
    public addValidatorDynamic(form: FormGroup, index: number, control: any, status: boolean): FormGroup {
        if (status) {
            Object.keys(((form.controls[control] as FormGroup).controls[index] as FormGroup).controls).forEach(
                (campo) => {
                    (form.controls[control] as FormGroup).controls[index]
                        .get(campo)
                        .setValidators([Validators.required]);
                    (form.controls[control] as FormGroup).controls[index].get(campo).updateValueAndValidity();
                }
            );
            return form;
        } else {
            Object.keys(((form.controls[control] as FormGroup).controls[index] as FormGroup).controls).forEach(
                (campo) => {
                    (form.controls[control] as FormGroup).controls[index].get(campo).clearValidators();
                    (form.controls[control] as FormGroup).controls[index].get(campo).updateValueAndValidity();
                }
            );
            return form;
        }
    }

    /**
     *
     * @param form
     * @param tipo: tipo 1 alergia, tipo 2 medicamento, tipo 3 doenca cronica
     */
    public parseForm(tipo: number, form: any): any {
        let values = Object.assign(form, {});

        if (tipo === 1) {
            return values.alergias;
        } else if (tipo === 2) {
            return values.medicamentos;
        } else {
            return values.doencaCronica;
        }
    }

    public parseFormSubmit(form: any, idPaciente: number): any {
        let valuesSubmit = Object.assign(form, {});
        valuesSubmit.alergias = valuesSubmit.alergias.map((element: any) =>
            Object.assign(element, { idPaciente: idPaciente })
        );
        valuesSubmit.medicamentos = valuesSubmit.medicamentos.map((element: any) =>
            Object.assign(element, { idPaciente: idPaciente })
        );
        valuesSubmit.doencas = valuesSubmit.doencas.map((element: any) =>
            Object.assign(element, { idPaciente: idPaciente })
        );

        return valuesSubmit;
    }

    public formFilesConfig(): FormGroup {
        return this._fb.group({
            arquivos: this._fb.array([this.newObjectFile()]),
        });
    }

    public newObjectFile(): FormGroup {
        const filesControl = new FormControl(null, FileUploadValidators.filesLimit(1));
        return this._fb.group({
            idTipo: [null],
            file: filesControl,
        });
    }
}

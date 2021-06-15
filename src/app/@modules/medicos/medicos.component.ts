import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IEspecializacaoModel } from '@app/models/especializacao-model';
import { MedicoService } from '@app/services/medico/medico.service';
import { UtilitariosService } from '@app/services/utilitarios/utilitarios.service';
import { untilDestroyed } from '../../@core/until-destroyed';
import { IDadosTodosMedicosModel } from '../../models/dados-todos-medicos-model';
import { finalize } from 'rxjs/operators';
import { error } from '@angular/compiler/src/util';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-medicos',
    templateUrl: './medicos.component.html',
    styleUrls: ['./medicos.component.scss'],
})
export class MedicosComponent implements OnInit, OnDestroy {
    public especializacoes: IEspecializacaoModel[];
    public medicos: IDadosTodosMedicosModel[] = [];
    public formBusca: FormGroup;
    public loading = false;

    constructor(
        private readonly _utilitariosService: UtilitariosService,
        private readonly _formBuilder: FormBuilder,
        private readonly _medicoService: MedicoService
    ) {}

    ngOnDestroy(): void {}

    ngOnInit(): void {
        this.initForm();
        this.getEspecializacoes();
        this.getAllMedicos();
    }

    public getEspecializacoes(): void {
        this._utilitariosService
            .getEspecializacoes()
            .pipe(untilDestroyed(this))
            .subscribe({
                next: (especializacoes: IEspecializacaoModel[]) => (this.especializacoes = especializacoes),
            });
    }

    public getAllMedicos(): void {
        this.loading = true;
        this._medicoService
            .getTodosMedicos()
            .pipe(
                untilDestroyed(this),
                finalize(() => (this.loading = false))
            )
            .subscribe({
                next: (body: IDadosTodosMedicosModel[]) => {
                    this.medicos = body;
                },
            });
    }

    public getMedicoPorEspecializacao(id: number): void {
        this.loading = true;
        this._medicoService
            .getMedicoPorEspecializacao(id)
            .pipe(
                untilDestroyed(this),
                finalize(() => (this.loading = false))
            )
            .subscribe({
                next: (body: IDadosTodosMedicosModel[]) => {
                    this.medicos = body;
                },
                error: (error: HttpErrorResponse) => {
                    if (error.status === 404) {
                        this.medicos = [];
                    }
                },
            });
    }

    public verificaIdBusca(id: number): void {
        if (id) {
            this.getMedicoPorEspecializacao(id);
        } else {
            this.getAllMedicos();
        }
    }

    public clearForm(): void {
        this.formBusca.reset();
    }

    private initForm(): void {
        this.formBusca = this._formBuilder.group({
            idEspecializacao: [null],
            crm: [null],
        });
    }
}

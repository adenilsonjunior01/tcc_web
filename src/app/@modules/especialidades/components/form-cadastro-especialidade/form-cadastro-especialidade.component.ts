import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EspecilidadeService } from '../../../../services/especilidade/especilidade.service';
import { untilDestroyed } from '../../../../@core/until-destroyed';
import { finalize } from 'rxjs/operators';
import { SweetalertService } from '@app/@shared/sweetalert/sweetalert.service';

@Component({
    selector: 'app-form-cadastro-especialidade',
    templateUrl: './form-cadastro-especialidade.component.html',
    styleUrls: ['./form-cadastro-especialidade.component.scss'],
})
export class FormCadastroEspecialidadeComponent implements OnInit, OnDestroy {
    @Output() closeModal = new EventEmitter();

    public form: FormGroup;
    public loading = false;

    constructor(
        private readonly _especialidadeService: EspecilidadeService,
        private readonly _fb: FormBuilder,
        private readonly _sweetAlert: SweetalertService
    ) {}

    ngOnDestroy(): void {}

    ngOnInit(): void {
        this.initForm();
    }

    public initForm() {
        this.form = this._fb.group({
            descEspecializacao: [null, Validators.required],
        });
    }

    public closeDialog() {}

    public save() {
        this._especialidadeService
            .salvarEspecializacao(this.form.value)
            .pipe(
                untilDestroyed(this),
                finalize(() => (this.loading = false))
            )
            .subscribe({
                next: () => {
                    this._sweetAlert.openToasty('Especilidade salva com sucesso!', 'success');
                    this.closeModal.emit(true);
                },
            });
    }
}

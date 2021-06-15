import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../../auth/authentication.service';
import { finalize } from 'rxjs/operators';
import { untilDestroyed } from '../../../../@core/until-destroyed';
import { SweetalertService } from '@app/@shared/sweetalert/sweetalert.service';

@Component({
    selector: 'app-tab-perfil',
    templateUrl: './tab-perfil.component.html',
    styleUrls: ['./tab-perfil.component.scss'],
})
export class TabPerfilComponent implements OnInit {
    @Input() dadosUser: any;
    public form: FormGroup;
    isLoading = false;
    hide = true;
    hide2 = true;

    constructor(
        private readonly _authenticationService: AuthenticationService,
        private readonly _sweetAlert: SweetalertService,
        private readonly _formBuilder: FormBuilder
    ) {
        this.initForm();
    }

    ngOnInit(): void {}

    public submitNewPassword(): void {
        if (this.form.valid) {
            this.isLoading = true;
            this._authenticationService
                .resetPassword(this.form.value)
                .pipe(
                    finalize(() => {
                        this.isLoading = false;
                    }),
                    untilDestroyed(this)
                )
                .subscribe({
                    next: (value) => {
                        this._sweetAlert.openToasty('Senha atualizada com sucesso', 'success');
                    },
                    error: (error) => console.log(error),
                });
        }
    }

    private initForm(): void {
        this.form = this._formBuilder.group({
            password: [null, Validators.required],
            passwordConfirmation: [null, Validators.required],
        });
    }
}

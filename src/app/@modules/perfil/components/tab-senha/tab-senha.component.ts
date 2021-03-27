import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../../auth/authentication.service';
import { SweetalertService } from '../../../../@shared/sweetalert/sweetalert.service';
import { finalize } from 'rxjs/operators';
import { untilDestroyed } from '../../../../@core/until-destroyed';

@Component({
  selector: 'app-tab-senha',
  templateUrl: './tab-senha.component.html',
  styleUrls: ['./tab-senha.component.scss'],
})
export class TabSenhaComponent implements OnInit {
  public loading = false;

  public formResetPassword: FormGroup;
  constructor(
    private readonly _authenticationService: AuthenticationService,
    private readonly _formBuilder: FormBuilder,
    private readonly _sweetAlert: SweetalertService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  public submitNewPassword(): void {
    if (this.formResetPassword.valid) {
      this.loading = true;
      this._authenticationService
        .resetPassword(this.formResetPassword.value)
        .pipe(
          finalize(() => {
            this.loading = false;
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
    this.formResetPassword = this._formBuilder.group({
      password: [null, Validators.required],
      passwordConfirmation: [null, Validators.required],
    });
  }
}

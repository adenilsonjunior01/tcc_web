import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { untilDestroyed } from '../../../@core/until-destroyed';
import { finalize } from 'rxjs/operators';
import { ModalAnimationComponent } from '../../../@shared/modal-animation/modal-animation.component';
import { CredentialsService } from '../../credentials.service';
import { SweetalertService } from '../../../@shared/sweetalert/sweetalert.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(ModalAnimationComponent) modal: any;

  hide = true;
  hide2 = true;
  public form: FormGroup;
  isLoading = false;
  params: any;

  constructor(
    private readonly _router: Router,
    private readonly _activetedRouter: ActivatedRoute,
    private readonly _formBuilder: FormBuilder,
    private readonly _service: AuthenticationService,
    private readonly _credentialsService: CredentialsService,
    private readonly _sweetAlert: SweetalertService
  ) {}

  ngAfterViewInit(): void {
    setTimeout(() => this.getCredentials(), 400);
  }

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.initForm();
    this._activetedRouter.queryParams.subscribe((v) => {
      this.params = v.email;
    });
  }

  public getCredentials() {
    const values: any = this._credentialsService.credentials;
    if (values.firtAcess) {
      this.modal.show('aviso-senha');
    }
  }

  public navigateLogin(): void {
    this._router.navigate(['/login'], { queryParams: { email: this.params }, replaceUrl: true });
  }

  public submitNewPassword(): void {
    if (this.form.valid) {
      this.isLoading = true;
      this._service
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
            this.navigateLogin();
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

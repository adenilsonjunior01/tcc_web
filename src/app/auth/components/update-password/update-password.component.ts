import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { untilDestroyed } from '../../../@core/until-destroyed';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent implements OnInit, OnDestroy {
  hide = true;
  hide2 = true;
  public form: FormGroup;
  loading = false;

  constructor(
    private readonly _router: Router,
    private readonly _formBuilder: FormBuilder,
    private readonly _service: AuthenticationService
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.initForm();
  }

  public navigateLogin(): void {
    this._router.navigateByUrl('/login', { replaceUrl: true });
  }

  public submitNewPassword(): void {
    if (this.form.valid) {
      this._service
        .resetPasswordTemporary(this.form.value)
        .pipe(
          finalize(() => {
            this.loading = false;
          }),
          untilDestroyed(this)
        )
        .subscribe({
          next: (value) => {},
          error: (error) => console.log(error),
        });
    }
  }

  private initForm(): void {
    this.form = this._formBuilder.group({
      antigoPassword: [null, Validators.required],
      novoPassword: [null, Validators.required],
    });
  }
}

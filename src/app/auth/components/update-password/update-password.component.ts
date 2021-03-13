import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent implements OnInit {
  hide = true;
  hide2 = true;
  public form: FormGroup;

  constructor(
    private readonly _router: Router,
    private readonly _formBuilder: FormBuilder,
    private readonly _service: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  public navigateLogin() {
    this._router.navigateByUrl('/login', { replaceUrl: true });
  }

  public submitNewPassword() {
    if (this.form.valid) {
      this._service.resetPasswordTemporary(this.form.value).subscribe({
        next: (value) => {},
        error: (error) => console.log(error),
      });
    }
  }

  private initForm() {
    this.form = this._formBuilder.group({
      antigoPassword: [null, Validators.required],
      novoPassword: [null, Validators.required],
    });
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, untilDestroyed } from '@core';
import { AuthenticationService } from './authentication.service';
import { ICredentialsModel } from '../models/credentials-model';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  version: string | null = environment.version;
  error: string | undefined;
  loginForm!: FormGroup;
  isLoading = false;
  hide = true;

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _formBuilder: FormBuilder,
    private readonly _authenticationService: AuthenticationService
  ) {
    this.createForm();
  }

  ngOnInit() {}

  ngOnDestroy() {}

  login() {
    this.isLoading = true;
    const login$ = this._authenticationService.login(this.loginForm.value);
    login$
      .pipe(
        finalize(() => {
          this.loginForm.markAsPristine();
          this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe({
        next: (credentials: ICredentialsModel) => {
          console.log(credentials);
          if (credentials.firtAcess) {
            this._router.navigate(['/update/password'], { replaceUrl: true });
          } else {
            log.debug(`${credentials.email} usuário autenticado!`);
            this._router.navigate([this._route.snapshot.queryParams.redirect || '/'], { replaceUrl: true });
          }
        },
        error: (error) => {
          log.debug(`Login error: ${error}`);
          this.error = error;
        },
      });
  }

  private createForm() {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      remember: true,
    });
  }
}

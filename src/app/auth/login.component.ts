import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { Logger, untilDestroyed } from '@core';
import { AuthenticationService } from './authentication.service';
import { ICredentialsModel } from '../models/credentials-model';
import { CredentialsService } from './credentials.service';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  version: string;
  error: string | undefined;
  loginForm!: FormGroup;
  isLoading = false;
  hide = true;
  params: any;
  public tokenDecode: any;
  public pending: any;
  public perfil: any;

  constructor(
    private readonly _router: Router,
    private readonly _activetedRouter: ActivatedRoute,
    private readonly _formBuilder: FormBuilder,
    private readonly _authenticationService: AuthenticationService,
    private readonly _credentialsService: CredentialsService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this._activetedRouter.queryParams.subscribe((v) => {
      this.params = v.email;
    });
    if (this.params) {
      this.loginForm.get('email').setValue(this.params);
    }
  }

  ngOnDestroy() {}

  login() {
    this.isLoading = true;
    const valuesSubmit = this.parseDataForm();
    const login$ = this._authenticationService.login(valuesSubmit);
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
          this.tokenDecode = this._credentialsService.decodeToken();
          this.verifyProfilePaciente();
          this.verifyProfileAdm();
          this.verifyProfileAssitente();
          this.verifyProfileMedico();
          this.verifyProfilePending();
          if (credentials.firtAcess) {
            this._router.navigate(['/update/password'], {
              queryParams: { email: this.loginForm.get('email').value },
              replaceUrl: true,
            });
          } else {
            log.debug(`${credentials.email} usuário autenticado!`);
            this._router.navigate([this._activetedRouter.snapshot.queryParams.redirect || '/'], { replaceUrl: true });
          }
        },
        error: (error) => {
          log.debug(`Login error: ${error}`);
          this.error = error;
        },
      });
  }

  public parseDataForm(): any {
    let values = Object.assign(this.loginForm.value, {});
    values = Object.assign(values, {
      email: values.email.trim(),
      senha: values.senha.trim(),
      remember: values.remember,
    });
    return values;
  }

  private createForm() {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      remember: true,
    });
  }

  private verifyProfileMedico(): void {
    const status = this.tokenDecode.perfis.filter((v: string) => v === 'MEDICO');
    if (status.length > 0) {
      this.perfil = status[0];
      this.setProfileLocalStorage(this.perfil);
    }
  }

  private verifyProfilePaciente(): void {
    const status = this.tokenDecode.perfis.filter((v: string) => v === 'PACIENTE');
    if (status.length > 0) {
      this.perfil = status[0];
      this.setProfileLocalStorage(this.perfil);
    }
  }

  private verifyProfileAssitente(): void {
    const status = this.tokenDecode.perfis.filter((v: string) => v === 'AUXILIAR');
    if (status.length > 0) {
      this.perfil = status[0];
      this.setProfileLocalStorage(this.perfil);
    }
  }

  private verifyProfileAdm(): void {
    const status = this.tokenDecode.perfis.filter((v: string) => v === 'ADMINISTRADOR');
    if (status.length > 0) {
      this.perfil = status[0];
      this.setProfileLocalStorage(this.perfil);
    }
  }

  private verifyProfilePending(): void {
    const status = this.tokenDecode.perfis.filter((v: string) => v === 'PENDENTE');
    if (status.length > 0) {
      this.setPendeingProfile(true);
    } else {
      this.setPendeingProfile(false);
    }
  }

  private setPendeingProfile(value: boolean) {
    localStorage.setItem('pendente', JSON.stringify(value));
  }

  private setProfileLocalStorage(perfil: string) {
    localStorage.setItem('perfil', perfil);
  }
}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, take, tap } from 'rxjs/operators';

import { Credentials, CredentialsService } from './credentials.service';

const routes = {
  login: () => `/login`,
  resetPassword: () => `/user/password`,
};

export interface ILoginContext {
  email: string;
  senha: string;
  remember?: boolean;
}

export interface IResetPassword {
  password: string;
  passwordConfirmation: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public perfil: any;

  constructor(private readonly _credentialsService: CredentialsService, private readonly _httpClient: HttpClient) {}

  /**
   * @param context Parametros de login.
   * @return Recebe as credenciais de acesso e verifica primeiro acesso do usuário.
   */
  public login(context: ILoginContext): Observable<Credentials> {
    const data = {
      email: context.email,
      senha: context.senha,
    };
    return this._httpClient.post(routes.login(), data).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      }),
      map((body: any) => {
        const credentials: any = {
          email: context.email,
          remember: context.remember,
          token: body.token,
          firtAcess: false,
        };
        this._credentialsService.setCredentials(credentials, context.remember);
        if (this.verifyFirtsAccess()) {
          credentials.firtAcess = true;
          this._credentialsService.setCredentials(credentials, context.remember);
          return credentials;
        } else {
          return false;
        }
      }),
      take(1)
    );
  }

  private verifyFirtsAccess(): boolean {
    this.decodeToken();
    const status = this.perfil.filter((v: string) => v === 'PRIMEIRO_ACESSO');
    if (status.length > 0) return true;
    return false;
  }

  private decodeToken(): void {
    const decode: any = this._credentialsService.decodeToken();
    this.perfil = decode.perfis;
  }

  public resetPassword(context: IResetPassword): Observable<any> {
    return this._httpClient.put(routes.resetPassword(), context).pipe(
      map((body: any) => body),
      catchError((error: HttpErrorResponse) => throwError(error)),
      take(1)
    );
  }

  /**
   * Limpa credenciais do usuário armazenadas no LocalStorage
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this._credentialsService.setCredentials();
    return of(true);
  }
}

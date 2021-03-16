import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, take } from 'rxjs/operators';

import { Credentials, CredentialsService } from './credentials.service';

const routes = {
  login: () => `/login`,
  resetPassword: () => `${environment.serverUrl}/`,
};

export interface ILoginContext {
  email: string;
  senha: string;
  remember?: boolean;
}

export interface IResetPassword {
  oldPassword: string;
  newPassword: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private readonly _credentialsService: CredentialsService,
    private readonly _httpClient: HttpClient) {}

  /**
   * @param context Parametros de login.
   * @return Recebe as credenciais de acesso e verifica primeiro acesso do usuário.
   */
  public login(context: ILoginContext): Observable<Credentials> {
    const data = {
      email: context.email,
      senha: context.senha
    };
     return this._httpClient.post(routes.login(), data).pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        }),
        map((body: any)=> {
          const credentials = {
            email: context.email,
            remember: context.remember,
            token: body.token
          };

          this._credentialsService.setCredentials(credentials, context.remember);
          return body;
        }),
        take(1)
      );
  }

  public resetPasswordTemporary(context: IResetPassword): Observable<any> {
    return this._httpClient.post(routes.resetPassword(), context).pipe(
      map((body: any) => body),
      catchError(() => of('Error')),
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

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map, catchError, take } from 'rxjs/operators';

import { Credentials, CredentialsService } from './credentials.service';

const routes = {
  login: () => '/',
  resetPassword: () => '/',
};

export interface ILoginContext {
  username: string;
  password: string;
  remember?: boolean;
  teste?: boolean;
}

export interface IResetPassword {
  oldPassword: string;
  newPassword: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private readonly _credentialsService: CredentialsService, private readonly _httpClient: HttpClient) {}

  /**
   * @param context Parametros de login.
   * @return Recebe as credenciais de acesso e verifica primeiro acesso do usuário.
   */
  public login(context: ILoginContext): Observable<Credentials> {
    const data = {
      username: context.username,
      token: '123456',
    };
    //  return this._httpClient.post(routes.login(), data).pipe(
    //    tap({
    //      complete:() => {
    //        if (!context.teste) {
    //           this._credentialsService.setCredentials(data, context.remember);
    //         }
    //       }
    //     }),
    //     catchError(() => of('Error')),
    //     map((body: any)=> body),
    //     take(1)
    //   );
    this._credentialsService.setCredentials(data, context.remember);
    return of(data);
  }

  // MAPEAR MODEL QUANDO BACK-END ESTIVER DEFINIDO O RETORNOS
  /**
   *
   * @param context Nova senha do usuário
   * @returns
   */
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

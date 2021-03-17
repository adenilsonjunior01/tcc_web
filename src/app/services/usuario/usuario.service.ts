import { Injectable } from '@angular/core';
import { IUsuarioModel } from '../../models/usuario-model';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, take } from 'rxjs/operators';

const routes = {
  user: () => `/user`,
  tipoSanguineo: () => `/tipoSanguineo`,
};

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private readonly _httpClient: HttpClient) {}

  public saveNewUser(user: IUsuarioModel): Observable<any> {
    return this._httpClient.post(routes.user(), user).pipe(
      catchError((error: HttpErrorResponse) => throwError(error)),
      map((body: any) => body),
      take(1)
    );
  }

  public updateUser(user: IUsuarioModel): Observable<any> {
    return this._httpClient.put(routes.user(), user).pipe(
      catchError((error: HttpErrorResponse) => throwError(error)),
      map((body: any) => body),
      take(1)
    );
  }

  // MAPEAR MODEL COM RETORNO DO END-POINT
  public getTiposSanguineo(): Observable<any> {
    return this._httpClient.get(routes.tipoSanguineo()).pipe(
      catchError((error: HttpErrorResponse) => throwError(error)),
      map((body: any) => body),
      take(1)
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IEspecializacaoModel } from '../../models/especializacao-model';
import { throwError, Observable } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';

const routes = {
  especializacoes: () => `/especializacao`,
};

@Injectable({
  providedIn: 'root',
})
export class UtilitariosService {
  constructor(private readonly _httpClient: HttpClient) {}

  public getEspecializacoes(): Observable<IEspecializacaoModel[]> {
    return this._httpClient.get(routes.especializacoes()).pipe(
      catchError((error: HttpErrorResponse) => throwError(error)),
      map((body: any) => body),
      take(1)
    );
  }
}

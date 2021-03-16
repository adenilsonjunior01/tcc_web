import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IDadosMedicosModel } from '../../models/dados-medicos-model';
import { Observable, throwError } from 'rxjs';
import { take, catchError, map } from 'rxjs/operators';

const routes = {
  dadosMedicos: () => `/dadosMedicos`
};

@Injectable({
  providedIn: 'root'
})
export class DadosMedicosService {

  constructor(
    private readonly _httpClient: HttpClient
  ) { }

  public updateDadosMedicos(dadosMedicos: IDadosMedicosModel): Observable<any> {
    return this._httpClient.put(routes.dadosMedicos(), dadosMedicos).pipe(
      catchError((error: HttpErrorResponse) => throwError(error)),
      map((body: any) => body),
      take(1));
  }

  // MAPEAR MODEL COM O RETORNO DO END-POINT
  public getDadosMedicos(): Observable<any> {
    return this._httpClient.get(routes.dadosMedicos()).pipe(
      catchError((error: HttpErrorResponse) => throwError(error)),
      map((body: any) => body),
      take(1));
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IClinicaModel } from '../../models/clinica-model';
import { Observable, throwError } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';

const routes = {
  clinica: () => `/clinica`,
  update: (id: number) => `/clinica/${id}`
};

@Injectable({
  providedIn: 'root'
})
export class ClinicaService {

  constructor(
    private readonly _httpClient: HttpClient
  ) { }

  public saveNewClinica(clinica: IClinicaModel): Observable<any> {
    return this._httpClient.post(routes.clinica(), clinica).pipe(
      catchError((error: HttpErrorResponse) => throwError(error)),
      map((body: any) => body),
      take(1));
  }

  public updateClinica(clinica: IClinicaModel, id: number): Observable<any> {
    return this._httpClient.put(routes.update(id), clinica).pipe(
      catchError((error: HttpErrorResponse) => throwError(error)),
      map((body: any) => body),
      take(1));
  }

  public getDadosClinica(): Observable<IClinicaModel> {
    return this._httpClient.get(routes.clinica()).pipe(
      catchError((error: HttpErrorResponse) => throwError(error)),
      map((body: any) => body),
      take(1));
  }
}

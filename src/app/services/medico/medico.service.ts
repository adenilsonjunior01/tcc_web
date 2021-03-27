import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { take, map, catchError } from 'rxjs/operators';
import { IMedicoModel } from '../../models/medico-model';
import { IDadosTodosMedicosModel } from '../../models/dados-todos-medicos-model';

const routes = {
  medico: () => `/medico`,
  medicoEspecializacao: (id: number) => `/medico/especializacao/${id}`,
  medicoAll: () => `/medico/all`,
};

@Injectable({
  providedIn: 'root',
})
export class MedicoService {
  constructor(private readonly _httpClient: HttpClient) {}

  public saveMedico(medico: IMedicoModel): Observable<any> {
    return this._httpClient.post(routes.medico(), medico).pipe(
      catchError((error: HttpErrorResponse) => throwError(error)),
      map((body: any) => body),
      take(1)
    );
  }

  public updateMedico(medico: IMedicoModel): Observable<any> {
    return this._httpClient.put(routes.medico(), medico).pipe(
      catchError((error: HttpErrorResponse) => throwError(error)),
      map((body: any) => body),
      take(1)
    );
  }

  public getMedicoPorEspecializacao(id: number): Observable<any> {
    return this._httpClient.get(routes.medicoEspecializacao(id)).pipe(
      catchError((error: HttpErrorResponse) => throwError(error)),
      map((body: any) => body),
      take(1)
    );
  }

  public getTodosMedicos(): Observable<IDadosTodosMedicosModel[]> {
    return this._httpClient.get(routes.medicoAll()).pipe(
      catchError((error: HttpErrorResponse) => throwError(error)),
      map((body: any) => body),
      take(1)
    );
  }
}

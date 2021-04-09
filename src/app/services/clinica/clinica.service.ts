import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IClinicaModel } from '../../models/clinica-model';
import { Observable, throwError } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { ITiposConsultaModel } from '../../models/tipos-consulta-model';
import { IConsultasModel } from '../../models/consultas-model';

const routes = {
  clinica: () => `/clinica`,
  update: (id: number) => `/clinica/${id}`,
  horariosDisponiveis: (data: string, idProcedimento: number) =>
    `/consulta/horariosLivres?data=${data}&idTipoProcedimento=${idProcedimento}`,
  tiposConsulta: () => `/procedimentoMedico/tipos`,
  consultas: (size: number, page: number) => `/consulta?size=${size}&page=${page}`,
  consultasPorMedico: (size: number, page: number, idMedico: number, idTemporalidade: number) =>
    `/consulta/porMedico/${idMedico}/${idTemporalidade}?size=${size}&page=${page}`,
};

@Injectable({
  providedIn: 'root',
})
export class ClinicaService {
  constructor(private readonly _httpClient: HttpClient) {}

  public saveNewClinica(clinica: IClinicaModel): Observable<any> {
    return this._httpClient.post(routes.clinica(), clinica).pipe(
      catchError((error: HttpErrorResponse) => throwError(error)),
      map((body: any) => body),
      take(1)
    );
  }

  public updateClinica(clinica: IClinicaModel, id: number): Observable<any> {
    return this._httpClient.put(routes.update(id), clinica).pipe(
      catchError((error: HttpErrorResponse) => throwError(error)),
      map((body: any) => body),
      take(1)
    );
  }

  public getDadosClinica(): Observable<IClinicaModel> {
    return this._httpClient.get(routes.clinica()).pipe(
      catchError((error: HttpErrorResponse) => throwError(error)),
      map((body: any) => body),
      take(1)
    );
  }

  // MAPEAR MODEL
  public getHorariosDiponiveisConsulta(data: string, idProcedimento: number): Observable<any> {
    return this._httpClient.get(routes.horariosDisponiveis(data, idProcedimento)).pipe(
      catchError((error: HttpErrorResponse) => throwError(error)),
      map((body: any) => body),
      take(1)
    );
  }

  public getTiposConsulta(): Observable<ITiposConsultaModel[]> {
    return this._httpClient.get(routes.tiposConsulta()).pipe(
      catchError((error: HttpErrorResponse) => throwError(error)),
      map((body: any) => body),
      take(1)
    );
  }

  public getAllConsultas(size: number, page: number): Observable<IConsultasModel> {
    return this._httpClient.get(routes.consultas(size, page)).pipe(
      catchError((error: HttpErrorResponse) => throwError(error)),
      map((body: any) => body),
      take(1)
    );
  }

  public getAllConsultasMedico(
    size: number,
    page: number,
    idMedico: number,
    idTemporalidade: number
  ): Observable<IConsultasModel> {
    return this._httpClient.get(routes.consultasPorMedico(size, page, idMedico, idTemporalidade)).pipe(
      catchError((error: HttpErrorResponse) => throwError(error)),
      map((body: any) => body),
      take(1)
    );
  }
}

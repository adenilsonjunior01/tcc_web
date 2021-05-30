import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IClinicaModel } from '../../models/clinica-model';
import { Observable, throwError } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { ITiposConsultaModel } from '../../models/tipos-consulta-model';
import { IConsultasModel, IConsultaModel } from '../../models/consultas-model';
import { IIniciarAtendimentoModel } from '../../models/iniciar-atendimento-model';
import { IDadosEstatisticosModel } from '../../models/dados-estastisticos-administrador';
import { IDadosEstatisticosAuxiliarModel } from '../../models/dados-estatisticos-auxiliar-home';
import { IDadosEstatisticosMedicoModel } from '../../models/dados-estatisticos-medico-model';

const routes = {
  clinica: () => `/clinica`,
  update: (id: number) => `/clinica/${id}`,
  horariosDisponiveis: (data: string, idProcedimento: number) =>
    `/consulta/horariosLivres?data=${data}&idTipoProcedimento=${idProcedimento}`,
  tiposConsulta: () => `/procedimentoMedico/tipos`,
  consultas: (size: number, page: number) => `/consulta?size=${size}&page=${page}`,
  consultasPorMedico: (size: number, page: number, idMedico: number, idTemporalidade: number) =>
    `/consulta/porMedico/${idMedico}/${idTemporalidade}?size=${size}&page=${page}`,
  consultasTemporalidade: (idTemporalidade: number) => `/consulta/temporalidade/${idTemporalidade}`,
  confirmarConsulta: (idConsulta: number) => `/consulta/confirmaConsulta/${idConsulta}`,
  cancelConsulta: (idConsulta: number) => `/consulta/cancelaConsulta/${idConsulta}`,
  buscarConsultas: (idPerfil: number, size: number, page: number) =>
    `/consulta/filtrar?paciente=${idPerfil}&size=${size}&page=${page}`,
  iniciarAtendimento: (idConsulta: number) => `/prontuario/${idConsulta}`,
  salvarProntuario: () => `/prontuario/finalizar`,
  dadosEstatisticosAdm: () => `/dashboard/administrador/3`,
  dadosEstatisticosAuxiliar: () => `/dashboard/auxiliar/3`,
  dadosEstatisticosMedico: () => `/dashboard/medico/3`,
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

  public getConsultasTemporalidade(idTemporalidade: number): Observable<any> {
    return this._httpClient.get(routes.consultasTemporalidade(idTemporalidade)).pipe(
      catchError((error: HttpErrorResponse) => throwError(error)),
      map((body: any) => body),
      take(1)
    );
  }

  public confirmConsulta(idConsulta: number): Observable<any> {
    const body = {};
    return this._httpClient.put(routes.confirmarConsulta(idConsulta), body).pipe(
      catchError((error: HttpErrorResponse) => throwError(error)),
      map((body: any) => body),
      take(1)
    );
  }

  public cancelConsulta(idConsulta: number): Observable<any> {
    const body = {};
    return this._httpClient.put(routes.cancelConsulta(idConsulta), body).pipe(
      catchError((error: HttpErrorResponse) => throwError(error)),
      map((body: any) => body),
      take(1)
    );
  }

  public getConsultasPaciente(idPerfil: number, size: number, page: number): Observable<IConsultasModel> {
    return this._httpClient.get(routes.buscarConsultas(idPerfil, size, page)).pipe(
      catchError((error: HttpErrorResponse) => throwError(error)),
      map((body: any) => body),
      take(1)
    );
  }

  public iniciarAtendimento(idConsulta: number): Observable<IIniciarAtendimentoModel> {
    const body = {};
    return this._httpClient.post(routes.iniciarAtendimento(idConsulta), body).pipe(
      catchError((error: HttpErrorResponse) => throwError(error)),
      map((body: any) => body),
      take(1)
    );
  }

  public salvarProntuarioMedico(prontuario: any): Observable<any> {
    return this._httpClient.put(routes.salvarProntuario(), prontuario).pipe(
      catchError((error: HttpErrorResponse) => throwError(error)),
      map((body: any) => body),
      take(1)
    );
  }

  public getDadosEstatisticosHomeAdm(): Observable<IDadosEstatisticosModel> {
    return this._httpClient.get(routes.dadosEstatisticosAdm()).pipe(
      catchError((error: HttpErrorResponse) => throwError(error)),
      map((body: any) => body),
      take(1)
    );
  }

  public getDadosEstatisticosHomeAuxiliar(): Observable<IDadosEstatisticosAuxiliarModel> {
    return this._httpClient.get(routes.dadosEstatisticosAuxiliar()).pipe(
      catchError((error: HttpErrorResponse) => throwError(error)),
      map((body: any) => body),
      take(1)
    );
  }

  public getDadosEstatisticosHomeMedico(): Observable<IDadosEstatisticosMedicoModel> {
    return this._httpClient.get(routes.dadosEstatisticosMedico()).pipe(
      catchError((error: HttpErrorResponse) => throwError(error)),
      map((body: any) => body),
      take(1)
    );
  }
}

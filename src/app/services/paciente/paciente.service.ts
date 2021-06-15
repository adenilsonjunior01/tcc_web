import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IPacienteModel } from '@app/models/paciente-model';
import { Observable, throwError } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { IPacientesPaginadoModel } from '../../models/pacientes-paginado-model';
import { IDadosEstatisticosPacienteModel } from '../../models/dados-estatisticos-paciente-model';
import { IMedicamentosReceitadosModel } from '../../models/medicamentos-receitados-model';

const routes = {
    updatePaciente: () => `/paciente`,
    getPaciente: (name: string) => `/paciente/pesquisa?nomePaciente=${name}`,
    getAllPacientes: (size: number, page: number) => `/paciente?size=${size}&page=${page}`,
    confirmConsulta: (id: number) => `/consulta/confirmaConsulta/${id}`,
    dadosEstatisticos: () => `/dashboard/paciente`,
    todosMendicamentos: (size: number, page: number) => `/medicamentos?size=${size}&page=${page}`,
};

@Injectable({
    providedIn: 'root',
})
export class PacienteService {
    constructor(private readonly _httpClient: HttpClient) {}

    public updatePaciente(paciente: IPacienteModel): Observable<any> {
        return this._httpClient.put(routes.updatePaciente(), paciente).pipe(
            catchError((error: HttpErrorResponse) => throwError(error)),
            map((body: any) => body),
            take(1)
        );
    }

    public getPaciente(name: string): Observable<IPacienteModel[]> {
        return this._httpClient.get(routes.getPaciente(name)).pipe(
            catchError((error: HttpErrorResponse) => throwError(error)),
            map((body: any) => body),
            take(1)
        );
    }

    public getAllPacientes(size: number, page: number): Observable<IPacientesPaginadoModel> {
        return this._httpClient.get(routes.getAllPacientes(size, page)).pipe(
            catchError((error: HttpErrorResponse) => throwError(error)),
            map((body: any) => body),
            take(1)
        );
    }

    public confirmConsulta(id: number): Observable<any> {
        return this._httpClient.get(routes.confirmConsulta(id)).pipe(
            catchError((error: HttpErrorResponse) => throwError(error)),
            map((body: any) => body),
            take(1)
        );
    }

    public getDadosEstatisticos(): Observable<IDadosEstatisticosPacienteModel> {
        return this._httpClient.get(routes.dadosEstatisticos()).pipe(
            catchError((error: HttpErrorResponse) => throwError(error)),
            map((body: any) => body),
            take(1)
        );
    }

    public getMedicamentosReceitados(size: number, page: number): Observable<IMedicamentosReceitadosModel> {
        return this._httpClient.get(routes.todosMendicamentos(size, page)).pipe(
            catchError((error: HttpErrorResponse) => throwError(error)),
            map((body: any) => body),
            take(1)
        );
    }
}

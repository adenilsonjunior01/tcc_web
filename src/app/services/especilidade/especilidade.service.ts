import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';

const routes = {
    salvar: () => `/especializacao`,
    atualizar: (id: number) => `/especializacao/${id}`,
    deletar: (id: number) => `/especializacao/${id}`,
};

@Injectable({
    providedIn: 'root',
})
export class EspecilidadeService {
    constructor(private readonly _httpClient: HttpClient) {}

    public salvarEspecializacao(obj: any): Observable<any> {
        return this._httpClient.post(routes.salvar(), obj).pipe(
            catchError((error: HttpErrorResponse) => throwError(error)),
            map((body: any) => body),
            take(1)
        );
    }

    public editarEspecializacao(obj: number, id: number): Observable<any> {
        return this._httpClient.put(routes.atualizar(id), obj).pipe(
            catchError((error: HttpErrorResponse) => throwError(error)),
            map((body: any) => body),
            take(1)
        );
    }

    public deletarEspecializacao(id: number): Observable<any> {
        return this._httpClient.delete(routes.deletar(id)).pipe(
            catchError((error: HttpErrorResponse) => throwError(error)),
            map((body: any) => body),
            take(1)
        );
    }
}

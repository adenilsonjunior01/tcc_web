import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IMedicamentoModel } from '../../models/medicamento-model';
import { Observable, throwError } from 'rxjs';
import { take, map, catchError } from 'rxjs/operators';

const routes = {
    medicamento: () => `/medicamentos`,
    deleteMedicamento: (id: number) => `/medicamentos/${id}`,
};

@Injectable({
    providedIn: 'root',
})
export class MedicamentoService {
    constructor(private readonly _httpClient: HttpClient) {}

    public saveMedicamento(medicamento: IMedicamentoModel[]): Observable<any> {
        return this._httpClient.post(routes.medicamento(), medicamento).pipe(
            catchError((error: HttpErrorResponse) => throwError(error)),
            map((body: any) => body),
            take(1)
        );
    }

    public updateMedicamento(medicamento: IMedicamentoModel): Observable<any> {
        return this._httpClient.put(routes.medicamento(), medicamento).pipe(
            catchError((error: HttpErrorResponse) => throwError(error)),
            map((body: any) => body),
            take(1)
        );
    }

    public deleteMedicamento(id: number): Observable<any> {
        return this._httpClient.delete(routes.deleteMedicamento(id)).pipe(
            catchError((error: HttpErrorResponse) => throwError(error)),
            map((body: any) => body),
            take(1)
        );
    }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IDoencaCronicaModel } from '../../models/doenca-cronica-model';
import { Observable, throwError } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';

const routes = {
    doencaCronica: () => `/doencaCronica`,
    deleteDoencaCronica: (id: number) => `/doencaCronica/${id}`,
};

@Injectable({
    providedIn: 'root',
})
export class DoencaCronicaService {
    constructor(private readonly _httpClient: HttpClient) {}

    public saveDoencaCronica(doencaCronica: IDoencaCronicaModel[]): Observable<any> {
        return this._httpClient.post(routes.doencaCronica(), doencaCronica).pipe(
            catchError((error: HttpErrorResponse) => throwError(error)),
            map((body: any) => body),
            take(1)
        );
    }

    public updaDoencaCronica(doencaCronica: IDoencaCronicaModel[]): Observable<any> {
        return this._httpClient.put(routes.doencaCronica(), doencaCronica).pipe(
            catchError((error: HttpErrorResponse) => throwError(error)),
            map((body: any) => body),
            take(1)
        );
    }

    public deleteDoencaCronica(id: number): Observable<any> {
        return this._httpClient.delete(routes.deleteDoencaCronica(id)).pipe(
            catchError((error: HttpErrorResponse) => throwError(error)),
            map((body: any) => body),
            take(1)
        );
    }
}

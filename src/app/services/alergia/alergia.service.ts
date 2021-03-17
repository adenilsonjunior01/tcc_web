import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IAlergiaModel } from '../../models/alergia-model';
import { Observable, throwError } from 'rxjs';
import { take, catchError, map } from 'rxjs/operators';

const routes = {
  alergia: () => `/alergia`,
  deleteAlergia: (id: number) => `/alergia/${id}`,
};

@Injectable({
  providedIn: 'root',
})
export class AlergiaService {
  constructor(private readonly _httpClient: HttpClient) {}

  public saveAlergia(alergia: IAlergiaModel[]): Observable<any> {
    return this._httpClient.post(routes.alergia(), alergia).pipe(
      catchError((error: HttpErrorResponse) => throwError(error)),
      map((body: any) => body),
      take(1)
    );
  }

  public deleteAlergia(id: number): Observable<any> {
    return this._httpClient.delete(routes.deleteAlergia(id)).pipe(
      catchError((error: HttpErrorResponse) => throwError(error)),
      map((body: any) => body),
      take(1)
    );
  }

  // MAPEAR MODEL DE RETORNO
  public getTiposAlergias(): Observable<IAlergiaModel> {
    return this._httpClient.get(routes.alergia()).pipe(
      catchError((error: HttpErrorResponse) => throwError(error)),
      map((body: any) => body),
      take(1)
    );
  }

  public updateAlergia(alergia: IAlergiaModel): Observable<any> {
    return this._httpClient.put(routes.alergia(), alergia).pipe(
      catchError((error: HttpErrorResponse) => throwError(error)),
      map((body: any) => body),
      take(1)
    );
  }
}

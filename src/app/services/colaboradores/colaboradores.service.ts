import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, take } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

const routes = {
  colaboradores: () => `/usuario/auxiliar`,
};

@Injectable({
  providedIn: 'root',
})
export class ColaboradoresService {
  constructor(private readonly _httpClient: HttpClient) {}

  // MAPEAR MODEL
  public getAllColaboradores(): Observable<any[]> {
    return this._httpClient.get(routes.colaboradores()).pipe(
      catchError((error: HttpErrorResponse) => throwError(error)),
      map((body: any) => body),
      take(1)
    );
  }
}

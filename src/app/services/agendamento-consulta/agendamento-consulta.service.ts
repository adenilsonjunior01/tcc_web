import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { IUsuarioModel } from '@app/models/usuario-model';

const routes = {
  agendamento: () => `/`,
  preCadastroPaciente: () => `/user`,
};

@Injectable({
  providedIn: 'root',
})
export class AgendamentoConsultaService {
  constructor(private readonly _httpClient: HttpClient) {}

  // CRIAR OS MODELS QUANDO BACK-END DISPONIBILIZAR O END-POINT FINAL
  public submitAgendamentoConsulta(obj: any): Observable<any> {
    return this._httpClient.post(routes.agendamento(), obj).pipe(
      map((body: any) => body),
      catchError((error: HttpErrorResponse) => throwError(error)),
      take(1)
    );
  }

  // CRIAR OS MODELS QUANDO BACK-END DISPONIBILIZAR O END-POINT FINAL
  public submitPreCadastroPaciente(obj: IUsuarioModel): Observable<IUsuarioModel> {
    return this._httpClient.post(routes.preCadastroPaciente(), obj).pipe(
      map((body: any) => body),
      catchError((error: HttpErrorResponse) => throwError(error)),
      take(1)
    );
  }
}

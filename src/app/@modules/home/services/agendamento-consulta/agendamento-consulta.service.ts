import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';

const routes = {
  agendamento: () => `/`,
  preCadastroPaciente: () => `/`,
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
      catchError(() => of('Erro ao agendar consulta!')),
      take(1)
    );
  }

  // CRIAR OS MODELS QUANDO BACK-END DISPONIBILIZAR O END-POINT FINAL
  public submitPreCadastroPaciente(obj: any): Observable<any> {
    return this._httpClient.post(routes.preCadastroPaciente(), obj).pipe(
      map((body: any) => body),
      catchError(() => of('Erro no pre cadastro do usuário!')),
      take(1)
    );
  }
}

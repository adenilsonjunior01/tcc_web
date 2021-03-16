import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger } from '../logger.service';
import { SweetalertService } from '../../@shared/sweetalert/sweetalert.service';
import { CredentialsService } from '../../auth/credentials.service';
import { Router, ActivatedRoute } from '@angular/router';

const log = new Logger('ErrorHandlerInterceptor');
const toasty = new SweetalertService();

/**
 * Adds a default error handler to all requests.
 */
@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(
    private readonly _credentials: CredentialsService,
    private readonly _router: Router,
    private readonly _route: ActivatedRoute) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((error) => this.errorHandler(error)));
  }

  /**
   *
   * @param response = apresenta Toasty padrão pra determinados errors
   */
  private errorHandler(response: HttpResponse<any>): Observable<HttpEvent<any>> {
    if (!environment.production) {
      this.responseErrorDev(response);
      log.error('Request error', response);
    } else {
      this.responseErrorProd(response);
    }
    throw response;
  }

  private responseErrorDev(response: HttpResponse<any>) {
    switch (response.status) {
      case 400:
        return toasty.openToasty('Formulário inválido - 400', 'error');
      case 401:
        return this.verifyTokenExpired();
      case 403:
        return toasty.openToasty('Usuário ou senha inválidos.', 'error');
      case 404:
        return toasty.openToasty('Rota não encontrada - 404', 'error');
      case 500:
        return toasty.openToasty('Deu ruim no servidor - 500', 'error');
      default:
        return toasty.openToasty(`Erro desconhecido ${response.status}`, 'error');
    }
  }

  private responseErrorProd(response: HttpResponse<any>): void {
    switch (response.status) {
      case 400:
        return toasty.openToasty('Erro ao processar dados.', 'error');
      case 401:
        return this.verifyTokenExpired();
      case 403:
        return toasty.openToasty('Usuário ou senha inválidos.', 'error');
      case 404:
        return toasty.openToasty('Erro ao completar requisição.', 'error');
      case 500:
        return toasty.openToasty('Desculpe, ocorreu um erro interno, conte o suporte.', 'error');
      default:
        return toasty.openToasty('Erro desconhecido, contate o suporte', 'error');
    }
  }

  private verifyTokenExpired() {
    if (this._credentials.isTokenExpired()) {
      this._router.navigate([this._route.snapshot.queryParams.redirect || '/'], { replaceUrl: true });
    }
  }

}

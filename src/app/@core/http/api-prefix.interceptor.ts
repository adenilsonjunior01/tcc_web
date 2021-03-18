import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';

/**
 * Prefixes all requests not starting with `http[s]` with `environment.serverUrl`.
 */
@Injectable({
  providedIn: 'root',
})
export class ApiPrefixInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url === '/login' && !/^(http|https):/i.test(request.url)) {
      request = request.clone({ url: environment.serverUrl + request.url });
    } else if (!/^(http|https):/i.test(request.url)) {
      request = request.clone({
        setHeaders: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('credentials')).token}`,
        },
        url: environment.serverUrl + request.url,
      });
    }
    return next.handle(request);
  }
}

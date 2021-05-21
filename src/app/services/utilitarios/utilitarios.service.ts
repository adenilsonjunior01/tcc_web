import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IEspecializacaoModel } from '../../models/especializacao-model';
import { throwError, Observable } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { ITiposFileModel } from '../../models/tipos-file-model';

const routes = {
  especializacoes: () => `/especializacao`,
  uploadFile: (idTipoArquivo: number, idProntuario: number) => `/files/upload/${idTipoArquivo}/${idProntuario}`,
  downloadFile: (idArquivo: any) => `/files/download/${idArquivo}`,
  removeFile: (idArquivo: any) => `/files/${idArquivo}`,
  tiposFile: () => `/files/tipos`,
};

@Injectable({
  providedIn: 'root',
})
export class UtilitariosService {
  constructor(private readonly _httpClient: HttpClient) {}

  public getEspecializacoes(): Observable<IEspecializacaoModel[]> {
    return this._httpClient.get(routes.especializacoes()).pipe(
      catchError((error: HttpErrorResponse) => throwError(error)),
      map((body: any) => body),
      take(1)
    );
  }

  public uploadFile(idTipoArquivo: number, idProntuario: number, file: any): Observable<any> {
    return this._httpClient.post(routes.uploadFile(idTipoArquivo, idProntuario), file).pipe(
      catchError((error: HttpErrorResponse) => throwError(error)),
      map((body: any) => body),
      take(1)
    );
  }

  public toFormData(file: any): any {
    const formData = new FormData();
    formData.append('file', new Blob([file], { type: 'multipart/form-data' }), file.name);

    return formData;
  }

  public downloadAnexo(idFile: any, responseType: any): Observable<any> {
    return this._httpClient.get(routes.downloadFile(idFile), { responseType: 'blob' as 'json' }).pipe(
      catchError((error: HttpErrorResponse) => throwError(error)),
      map((body: any) => body),
      take(1)
    );
  }

  public deleteFile(idFile: any): Observable<any> {
    return this._httpClient.delete(routes.removeFile(idFile)).pipe(
      catchError((error: HttpErrorResponse) => throwError(error)),
      map((body: any) => body),
      take(1)
    );
  }

  public getTiposFile(): Observable<ITiposFileModel[]> {
    return this._httpClient.get(routes.tiposFile()).pipe(
      catchError((error: HttpErrorResponse) => throwError(error)),
      map((body: any) => body),
      take(1)
    );
  }
}

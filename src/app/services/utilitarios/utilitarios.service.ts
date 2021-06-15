import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { IEspecializacaoModel } from '../../models/especializacao-model';
import { throwError, Observable } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';
import { ITiposFileModel } from '../../models/tipos-file-model';
import { CredentialsService } from '../../auth/credentials.service';

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
    constructor(private readonly _httpClient: HttpClient, private readonly _credentials: CredentialsService) {}

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
        formData.append('file', new Blob([file[0]], { type: file[0].type }), file[0].name);
        // formData.append('file', new Blob([file], { type: 'multipart/form-data' }), file.name);

        return formData;
    }

    public downloadFile(urlToSend: string): void {
        const req = new XMLHttpRequest();
        req.open('GET', urlToSend, true);
        req.setRequestHeader('Authorization', `Bearer ${this._credentials.credentials.token}`);
        req.responseType = 'blob';
        req.send();
        req.onload = (_) => {
            const blob = req.response;
            // IE
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(blob);
                return;
            }

            const fileName = req.getResponseHeader('Content-Disposition');
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.click();

            // firefox
            setTimeout(() => {
                window.URL.revokeObjectURL(blob);
                link.remove();
            }, 200);
        };
    }

    public download(urlToSend: string): any {
        const request = this._httpClient.get(urlToSend, {
            headers: new HttpHeaders({
                Authorization: `Bearer ${this._credentials.credentials.token}`,
                responseType: 'blob',
            }),
        });
        request.subscribe((response: any) => {});
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

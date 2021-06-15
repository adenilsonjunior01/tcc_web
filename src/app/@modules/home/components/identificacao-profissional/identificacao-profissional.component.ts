import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService } from '@app/services/usuario/usuario.service';
import { untilDestroyed } from '../../../../@core/until-destroyed';
import { finalize } from 'rxjs/operators';
import { Logger } from '../../../../@core/logger.service';
import { IDadosUserModel } from '../../../../models/dados-user-model';
import { ClinicaService } from '@app/services/clinica/clinica.service';
import { IClinicaModel } from '../../../../models/clinica-model';

const log = new Logger('Identificação Profissional');

@Component({
    selector: 'app-identificacao-profissional',
    templateUrl: './identificacao-profissional.component.html',
    styleUrls: ['./identificacao-profissional.component.scss'],
})
export class IdentificacaoProfissionalComponent implements OnInit, OnDestroy {
    public loading = false;
    public dadosUser: IDadosUserModel;
    public nomeClinica: string;

    constructor(private readonly _usuarioService: UsuarioService, private readonly _dadosClinica: ClinicaService) {}

    ngOnDestroy(): void {}

    ngOnInit(): void {
        this.getDadosClinica();
        this.getDadosUser();
    }

    public getDadosUser(): void {
        this.loading = true;
        this._usuarioService
            .getDadosUser()
            .pipe(
                untilDestroyed(this),
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe({
                next: (body: IDadosUserModel) => {
                    this.dadosUser = body;
                },
                error: (error) => {
                    log.error(error);
                },
            });
    }

    public getDadosClinica(): void {
        this._dadosClinica
            .getDadosClinica()
            .pipe(untilDestroyed(this))
            .subscribe({
                next: (body: IClinicaModel) => {
                    this.nomeClinica = body.nome;
                },
            });
    }
}

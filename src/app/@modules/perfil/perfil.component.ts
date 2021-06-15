import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ModalAnimationComponent } from '../../@shared/modal-animation/modal-animation.component';
import { CredentialsService } from '../../auth/credentials.service';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { untilDestroyed } from '../../@core/until-destroyed';
import { Logger } from '../../@core/logger.service';
import { IDadosUserModel } from '../../models/dados-user-model';
import { finalize } from 'rxjs/operators';

const log = new Logger('Perfil');

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit, OnDestroy {
    @ViewChild(ModalAnimationComponent) modal: any;

    public perfil: string;
    public perfilPendente: boolean;
    public dadosUser: IDadosUserModel;
    public type: number;
    public loading = false;

    constructor(private readonly _credentials: CredentialsService, private readonly _service: UsuarioService) {}

    ngOnDestroy(): void {
        this.dadosUser = null;
    }

    ngOnInit(): void {
        this.perfil = this._credentials.profile;
        this.perfilPendente = this._credentials.profilePending;
        this.getDadosUser();
    }

    public openModal(idModal: string, type: number): void {
        this.modal.show(idModal);
        this.type = type;
    }

    public closeModal(idModal: string): void {
        this.modal.close(idModal);
        this.getDadosUser();
    }

    public getDadosUser(): void {
        this.loading = true;
        this._service
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
}

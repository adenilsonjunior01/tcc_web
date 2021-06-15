import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalAnimationComponent } from '../../@shared/modal-animation/modal-animation.component';
import { CredentialsService, Token } from '../../auth/credentials.service';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
    @ViewChild(ModalAnimationComponent) modal: any;

    constructor(private readonly _credentials: CredentialsService) {}

    perfil: string;
    tokenDecode: Token;

    ngOnInit(): void {
        this.decodeToken();
        this.getPerfil();
    }

    private decodeToken(): void {
        this.tokenDecode = this._credentials.decodeToken();
    }

    private getPerfil(): void {
        this.perfil = this._credentials.profile;
    }

    public closeModal(event: boolean): void {
        if (event) {
            this.modal.close('dados-basicos');
        }
    }

    public verifyProfilePending(): boolean {
        if (this._credentials.profile === 'MEDICO' && this._credentials.profilePending) {
            return true;
        } else if (this._credentials.profile === 'PACIENTE' && this._credentials.profilePending) {
            return true;
        } else {
            return false;
        }
    }
}

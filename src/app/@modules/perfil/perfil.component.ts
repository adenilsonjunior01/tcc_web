import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ModalAnimationComponent } from '../../@shared/modal-animation/modal-animation.component';
import { CredentialsService } from '../../auth/credentials.service';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { untilDestroyed } from '../../@core/until-destroyed';
import { Logger } from '../../@core/logger.service';
import { IDadosUserModel } from '../../models/dados-user-model';

const log = new Logger('Perfil');

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit, OnDestroy {
  @ViewChild(ModalAnimationComponent) modal: any;

  public perfil: string;
  public dadosUser: IDadosUserModel;

  constructor(private readonly _credentials: CredentialsService, private readonly _service: UsuarioService) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.perfil = this._credentials.profile;
  }

  public openModal(idModal: string): void {
    this.modal.show(idModal);
  }

  public getDadosUser(): void {
    this._service
      .getDadosUser()
      .pipe(untilDestroyed(this))
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

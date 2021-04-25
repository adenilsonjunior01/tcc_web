import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalAnimationComponent } from '../../@shared/modal-animation/modal-animation.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CredentialsService, Token } from '../../auth/credentials.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild(ModalAnimationComponent) modal: any;
  quote: string | undefined;
  isLoading = false;
  jwt = new JwtHelperService();

  perfil: string;
  idPerfil: number;

  constructor(private readonly _credentials: CredentialsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.getPerfilUser();
    this.getIdPerfil();
  }

  public openModal(id: string) {
    this.modal.show(id);
  }

  public getPerfilUser() {
    this.perfil = this._credentials.profile;
  }

  public getIdPerfil() {
    const tokenDecode: Token = this._credentials.decodeToken();
    this.idPerfil = tokenDecode.idPerfil;
  }
}

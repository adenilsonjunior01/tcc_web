import { Component, OnInit, ViewChild } from '@angular/core';

import { QuoteService } from './quote.service';
import { ModalAnimationComponent } from '../../@shared/modal-animation/modal-animation.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CredentialsService } from '../../auth/credentials.service';

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

  constructor(private readonly _credentials: CredentialsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.getPerfilUser();
  }

  public openModal(id: string) {
    this.modal.show(id);
  }

  public getPerfilUser() {
    this.perfil = this._credentials.profile;
  }
}

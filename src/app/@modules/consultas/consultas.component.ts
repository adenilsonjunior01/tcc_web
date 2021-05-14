import { Component, OnInit, OnDestroy } from '@angular/core';
import { CredentialsService } from '../../auth/credentials.service';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.scss'],
})
export class ConsultasComponent implements OnInit, OnDestroy {
  public perfil: string;

  constructor(private readonly _credentials: CredentialsService) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.perfil = this._credentials.profile;
  }
}

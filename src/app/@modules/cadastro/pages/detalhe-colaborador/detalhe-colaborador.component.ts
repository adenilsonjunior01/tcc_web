import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalhe-colaborador',
  templateUrl: './detalhe-colaborador.component.html',
  styleUrls: ['./detalhe-colaborador.component.scss'],
})
export class DetalheColaboradorComponent implements OnInit {
  public dadosColaborador: any;

  constructor(private readonly _router: Router) {
    const state = this._router.getCurrentNavigation();
    if (state.extras.state) {
      this.setDadosColaboradorLocalStorage(state.extras.state);
      this.dadosColaborador = state.extras.state;
    } else {
      this.dadosColaborador = this.getDadosColaboradorLocalStorage();
    }
  }

  ngOnInit(): void {}

  public setDadosColaboradorLocalStorage(dados: any): void {
    localStorage.setItem('dadosColaborador', JSON.stringify(dados));
  }

  public getDadosColaboradorLocalStorage(): any {
    return JSON.parse(localStorage.getItem('dadosColaborador'));
  }

  public removeDadosColaboradorLocalStorage(): void {
    localStorage.removeItem('dadosColaborador');
  }

  public backPage() {
    this._router.navigateByUrl('/cadastro/colaboradores');
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-novo-colaborador',
  templateUrl: './card-novo-colaborador.component.html',
  styleUrls: ['./card-novo-colaborador.component.scss'],
})
export class CardNovoColaboradorComponent implements OnInit {
  constructor(private readonly _router: Router) {}

  ngOnInit(): void {}

  public redirecionaPaginaColaborador(): void {
    this._router.navigateByUrl('/cadastro/colaboradores?openModal=true');
  }
}

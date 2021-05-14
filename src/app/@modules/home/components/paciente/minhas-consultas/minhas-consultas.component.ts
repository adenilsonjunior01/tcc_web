import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-minhas-consultas',
  templateUrl: './minhas-consultas.component.html',
  styleUrls: ['./minhas-consultas.component.scss'],
})
export class MinhasConsultasComponent implements OnInit {
  constructor(private readonly _router: Router) {}

  ngOnInit(): void {}

  public redirectMinhasConsultas(): void {
    this._router.navigateByUrl('/consultas');
  }
}

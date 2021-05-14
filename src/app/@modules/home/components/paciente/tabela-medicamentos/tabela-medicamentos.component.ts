import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-tabela-medicamentos',
  templateUrl: './tabela-medicamentos.component.html',
  styleUrls: ['./tabela-medicamentos.component.scss'],
})
export class TabelaMedicamentosComponent implements OnInit {
  public loading = false;

  public itemsPerPage = 10;
  public currentPage: number;
  public totalItems: number;
  public page = 0;
  public medicamentos: any[] = [];

  constructor() {}

  ngOnInit(): void {}

  public options: AnimationOptions = {
    path: '/assets/lottie/lottie-search.json',
  };

  public pageChanged(event: number): void {
    this.page = event;
  }
}

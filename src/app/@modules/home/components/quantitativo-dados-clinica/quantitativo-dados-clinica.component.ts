import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-quantitativo-dados-clinica',
  templateUrl: './quantitativo-dados-clinica.component.html',
  styleUrls: ['./quantitativo-dados-clinica.component.scss'],
})
export class QuantitativoDadosClinicaComponent implements OnInit {
  public loading = true;

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => (this.loading = false), 3000);
  }
}

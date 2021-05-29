import { Component, Input, OnInit } from '@angular/core';
import { IDiagnosticosPorDataModel } from '../../../../../models/dados-estatisticos-paciente-model';

@Component({
  selector: 'app-tabela-diagnosticos-data',
  templateUrl: './tabela-diagnosticos-data.component.html',
  styleUrls: ['./tabela-diagnosticos-data.component.scss'],
})
export class TabelaDiagnosticosDataComponent implements OnInit {
  @Input() diagnosticosPorData: IDiagnosticosPorDataModel[];

  constructor() {}

  ngOnInit(): void {}
}

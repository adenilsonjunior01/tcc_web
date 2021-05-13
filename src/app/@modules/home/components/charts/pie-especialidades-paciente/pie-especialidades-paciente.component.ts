import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { ChartOptions } from '../dados-gerais-clinica/dados-gerais-clinica.component';
import { ChartPieConfig } from '../../../config/chart-paciente/chart-pie-config';

@Component({
  selector: 'app-pie-especialidades-paciente',
  templateUrl: './pie-especialidades-paciente.component.html',
  styleUrls: ['./pie-especialidades-paciente.component.scss'],
})
export class PieEspecialidadesPacienteComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  public chartPieConfig: any;

  constructor() {
    this.chartPieConfig = ChartPieConfig.configChartData;
  }

  ngOnInit(): void {}
}

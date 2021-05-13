import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { ChartOptions } from '../dados-gerais-clinica/dados-gerais-clinica.component';
import { ChartConfig1 } from '../../../config/chart-paciente/chart-config-1';
import { ChartConfig2 } from '../../../config/chart-paciente/chart-config-2';

@Component({
  selector: 'app-estatisticas-paciente',
  templateUrl: './estatisticas-paciente.component.html',
  styleUrls: ['./estatisticas-paciente.component.scss'],
})
export class EstatisticasPacienteComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chart1: any;
  public chart2: any;
  public loading = true;

  constructor() {
    this.chart1 = ChartConfig1.configChartData;
    this.chart2 = ChartConfig2.configChartData;
  }

  ngOnInit(): void {
    setTimeout(() => (this.loading = false), 3000);
  }
}

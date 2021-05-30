import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexPlotOptions, ApexXAxis } from 'ng-apexcharts';
import { IConsultaMensalPorStatusModel } from '../../../../../models/dados-estatisticos-auxiliar-home';
import { ChartBarConfig } from '../../../config/chart-bar-config';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
};

@Component({
  selector: 'app-bar-pacientes-medico',
  templateUrl: './bar-pacientes-medico.component.html',
  styleUrls: ['./bar-pacientes-medico.component.scss'],
})
export class BarPacientesMedicoComponent implements OnInit, OnChanges {
  @Input() consultaMensalPorStatus: IConsultaMensalPorStatusModel[];

  public loading = true;
  public chartOptions: Partial<ChartOptions>;
  constructor() {
    this.chartOptions = ChartBarConfig.configChartData;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.consultaMensalPorStatus) {
      this.chartOptions = {
        chart: {
          id: 'chart',
          type: 'bar',
          height: 350,
        },
        series: [
          {
            name: 'Qtd',
            data: [0],
          },
        ],
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: [''],
        },
      };
      this.setDadosMedicosGrafico();
    }
  }

  ngOnInit(): void {}

  private setDadosMedicosGrafico(): void {
    this.chartOptions.series[0].data = [];
    this.chartOptions.xaxis.categories = [];

    this.consultaMensalPorStatus.forEach((value: any) => {
      this.chartOptions.series[0].data.push(value.quantidade);
      this.chartOptions.xaxis.categories.push(value.descricao);
    });
    this.loading = false;
  }
}

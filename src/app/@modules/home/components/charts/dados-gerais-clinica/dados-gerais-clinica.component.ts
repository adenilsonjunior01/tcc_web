import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels, ApexPlotOptions } from 'ng-apexcharts';
import { IMedicoAtendimentoModel } from '@app/models/dados-estastisticos-administrador';
import { ChartBarConfig } from '../../../config/chart-bar-config';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
};

@Component({
  selector: 'app-dados-gerais-clinica',
  templateUrl: './dados-gerais-clinica.component.html',
  styleUrls: ['./dados-gerais-clinica.component.scss'],
})
export class DadosGeraisClinicaComponent implements OnInit, OnChanges {
  @Input() title: string;
  @Input() medicoAtendimento: IMedicoAtendimentoModel[];

  public chartOptions: Partial<ChartOptions>;
  public loading = true;

  constructor() {
    this.chartOptions = ChartBarConfig.configChartData;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.medicoAtendimento) {
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

  ngOnInit(): void {
    setTimeout(() => (this.loading = false), 3000);
  }

  private setDadosMedicosGrafico(): void {
    this.chartOptions.series[0].data = [];
    this.chartOptions.xaxis.categories = [];

    if (this.medicoAtendimento.length > 0) {
      this.medicoAtendimento.forEach((value: any) => {
        this.chartOptions.series[0].data.push(value.quantidade);
        this.chartOptions.xaxis.categories.push(value.descricao);
      });
    } else {
      this.chartOptions.series[0].data = [0];
      this.chartOptions.xaxis.categories = [0];
    }
  }
}

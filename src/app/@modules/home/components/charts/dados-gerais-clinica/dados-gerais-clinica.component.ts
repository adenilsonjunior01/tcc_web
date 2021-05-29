import { Component, Input, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConfigClinica1 } from '../../../config/chart-clinica/chart-config-clinica-1';
import { ChartConfigClinica2 } from '../../../config/chart-clinica/chart-config-clinica-2';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexPlotOptions,
} from 'ng-apexcharts';
import { IMedicoAtendimentoModel } from '@app/models/dados-estastisticos-administrador';

// export type ChartOptions = {
//   series: ApexAxisChartSeries;
//   chart: ApexChart;
//   xaxis: ApexXAxis;
//   title: ApexTitleSubtitle;
// };

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
  @ViewChild('chart') chart: ChartComponent;
  @Input() medicoAtendimento: IMedicoAtendimentoModel[];

  public chartOptions: Partial<ChartOptions>;
  public chart1: any;
  public chart2: any;
  public loading = true;

  constructor() {
    this.chart1 = ChartConfigClinica1.configChartData;
    this.chart2 = ChartConfigClinica2.configChartData;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.medicoAtendimento) {
      this.chartOptions = {
        series: [
          {
            name: 'Qtd',
            data: [0],
          },
        ],
        chart: {
          id: 'chart',
          type: 'bar',
          height: 350,
        },

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

  private setDadosMedicosGrafico(chart?: any, config?: any): void {
    this.chartOptions.series[0].data = [];
    this.chartOptions.xaxis.categories = [];

    this.medicoAtendimento.forEach((value: any) => {
      this.chartOptions.series[0].data.push(value.quantidade);
      this.chartOptions.xaxis.categories.push(value.descricao);
    });
  }
}

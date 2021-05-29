import { Component, OnInit, OnChanges, SimpleChanges, ViewChild, Input } from '@angular/core';
import { ChartPieConfig } from '../../../config/chart-paciente/chart-pie-config';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexXAxis,
} from 'ng-apexcharts';
import { IQuantitativosPorTipoProcedimentoModel } from '../../../../../models/dados-estatisticos-paciente-model';
import { IEspecializacoesMedicosModel } from '../../../../../models/dados-estastisticos-administrador';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
};

@Component({
  selector: 'app-pie-especializacoes-mes',
  templateUrl: './pie-especializacoes-mes.component.html',
  styleUrls: ['./pie-especializacoes-mes.component.scss'],
})
export class PieEspecializacoesMesComponent implements OnInit, OnChanges {
  @ViewChild('chart') chart: ChartComponent;
  @Input() especializacoesMes: IEspecializacoesMedicosModel[];
  public chartOptions: Partial<ChartOptions>;

  public chartPieConfig: any;

  constructor() {
    this.chartPieConfig = ChartPieConfig.configChartData;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.especializacoesMes) {
      this.setDadosGraficoDeEspecialidades();
    }
  }

  ngOnInit(): void {}

  private setDadosGraficoDeEspecialidades(): void {
    this.chartPieConfig.labels = [];
    this.chartPieConfig.series = [];

    this.especializacoesMes.forEach((value: any) => {
      this.chartPieConfig.labels.push(value.descricao);
      this.chartPieConfig.series.push(value.quantidade);
    });
  }
}

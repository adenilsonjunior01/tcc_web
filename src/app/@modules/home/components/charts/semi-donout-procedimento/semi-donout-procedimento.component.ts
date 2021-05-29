import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IQuantitativosPorTipoProcedimentoModel } from '../../../../../models/dados-estatisticos-paciente-model';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle } from 'ng-apexcharts';
import { ChartSemiDonoutConfig } from '../../../config/chart-paciente/chart-semi-donout-config';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-semi-donout-procedimento',
  templateUrl: './semi-donout-procedimento.component.html',
  styleUrls: ['./semi-donout-procedimento.component.scss'],
})
export class SemiDonoutProcedimentoComponent implements OnInit, OnChanges {
  @Input() quantitativosPorTipoProcedimento: IQuantitativosPorTipoProcedimentoModel[];
  public chartOptions: Partial<ChartOptions>;

  public chartSemiDonout: any;

  constructor() {
    this.chartSemiDonout = ChartSemiDonoutConfig.configChartData;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.quantitativosPorTipoProcedimento) {
      this.setDadosGraficoDeEspecialidades();
    }
  }

  ngOnInit(): void {}

  private setDadosGraficoDeEspecialidades(): void {
    this.chartSemiDonout.labels = [];
    this.chartSemiDonout.series = [];

    this.quantitativosPorTipoProcedimento.forEach((value: any) => {
      this.chartSemiDonout.labels.push(value.descricao);
      this.chartSemiDonout.series.push(value.quantidade);
    });
  }
}

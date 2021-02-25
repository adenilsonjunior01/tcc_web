import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfig1 } from '../../config/chart-config-1';
import { ChartConfig2 } from '../../config/chart-config-2';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-charts-estatisticas-medico',
  templateUrl: './charts-estatisticas-medico.component.html',
  styleUrls: ['./charts-estatisticas-medico.component.scss']
})
export class ChartsEstatisticasMedicoComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chart1: any;
  public chart2: any;

  constructor() {
    this.chart1 = ChartConfig1.configChartData;
    this.chart2 = ChartConfig2.configChartData;
  }

  ngOnInit(): void {
  }

}
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfigClinica1 } from '../../../config/chart-clinica/chart-config-clinica-1';
import { ChartConfigClinica2 } from '../../../config/chart-clinica/chart-config-clinica-2';
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
  selector: 'app-dados-gerais-clinica',
  templateUrl: './dados-gerais-clinica.component.html',
  styleUrls: ['./dados-gerais-clinica.component.scss']
})
export class DadosGeraisClinicaComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chart1: any;
  public chart2: any;

  constructor() {
    this.chart1 = ChartConfigClinica1.configChartData;
    this.chart2 = ChartConfigClinica2.configChartData;
  }

  ngOnInit(): void {
  }

}

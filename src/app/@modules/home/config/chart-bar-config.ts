import { ChartOptions } from '../components/charts/bar-pacientes-medico/bar-pacientes-medico.component';

export class ChartBarConfig {
  public static configChartData: Partial<ChartOptions> = {
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
}

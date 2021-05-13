export class ChartPieConfig {
  public static configChartData = {
    series: [44, 55, 13, 43, 22],
    chart: {
      width: 400,
      type: 'pie',
    },
    // colors: ['#70A6E8', "2ed8b6", "#fcae73", "#ff5252", "#2ed8b6", "#f8f9fa"],
    labels: ['Cardiologista', 'Dermatologista', 'Cirurgião', 'Team D', 'Team E'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };
}

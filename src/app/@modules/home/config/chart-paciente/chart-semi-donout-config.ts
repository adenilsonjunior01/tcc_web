export class ChartSemiDonoutConfig {
    public static configChartData = {
        // series: [44, 55, 41, 17, 15],
        // chart: {
        //   width: 380,
        //   type: "donut"
        // },
        // colors: ['#4680ff', '#0e9e4a', '#00acc1', '#ffa21d', '#ff5252'],
        // legend: {
        //   show: true,
        //   position: 'bottom',
        // },
        // plotOptions: {
        //   pie: {
        //     donut: {
        //       labels: {
        //         show: true,
        //         name: {
        //           show: true
        //         },
        //         value: {
        //           show: true
        //         }
        //       }
        //     }
        //   }
        // },
        // dataLabels: {
        //   enabled: true,
        //   dropShadow: {
        //     enabled: false,
        //   }
        // },
        // responsive: [
        //   {
        //     breakpoint: 480,
        //     options: {
        //       chart: {
        //         width: 200
        //       },
        //       legend: {
        //         position: 'bottom'
        //       }
        //     }
        //   }
        // ]
        chart: {
            height: 280,
            type: 'donut',
        },
        series: [44, 55, 41, 17, 15],
        colors: ['#4680ff', '#0e9e4a', '#00acc1', '#ffa21d', '#ff5252'],
        legend: {
            show: true,
            position: 'bottom',
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        name: {
                            show: true,
                        },
                        value: {
                            show: true,
                        },
                    },
                },
            },
        },
        dataLabels: {
            enabled: true,
            dropShadow: {
                enabled: false,
            },
        },
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

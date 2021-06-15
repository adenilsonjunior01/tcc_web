export class ChartConfig2 {
    public static configChartData = {
        chart: {
            type: 'area',
            height: 120,
            sparkline: {
                enabled: true,
            },
        },
        colors: ['#2ed8b6'],
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        series: [
            {
                data: [0, 20, 10, 45, 30, 55, 20, 30, 0],
            },
        ],
        tooltip: {
            fixed: {
                enabled: false,
            },
            x: {
                show: false,
            },
            y: {
                title: {
                    formatter: (seriesName: any) => 'Ticket ',
                },
            },
            marker: {
                show: false,
            },
        },
    };
}

export class ChartConfig1 {
    public static configChartData = {
        chart: {
            type: 'area',
            height: 120,
            sparkline: {
                enabled: true,
            },
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        series: [
            {
                name: 'series1',
                data: [31, 40, 28, 51, 42, 109, 100],
            },
            {
                name: 'series2',
                data: [11, 32, 45, 32, 34, 52, 41],
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

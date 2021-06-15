export class ChartPieConfig {
    public static configChartData = {
        series: [0],
        chart: {
            height: 280,
            type: 'pie',
        },
        theme: {
            monochrome: {
                enabled: true,
            },
        },
        // colors: ['#70A6E8', "2ed8b6", "#fcae73", "#ff5252", "#2ed8b6", "#f8f9fa"],
        labels: [''],
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

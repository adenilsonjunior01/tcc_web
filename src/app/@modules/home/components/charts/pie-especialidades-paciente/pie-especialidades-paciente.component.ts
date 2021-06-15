import { Component, Input, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { ChartOptions } from '../dados-gerais-clinica/dados-gerais-clinica.component';
import { ChartPieConfig } from '../../../config/chart-paciente/chart-pie-config';
import { IQuantitativosPorTipoProcedimentoModel } from '../../../../../models/dados-estatisticos-paciente-model';

@Component({
    selector: 'app-pie-especialidades-paciente',
    templateUrl: './pie-especialidades-paciente.component.html',
    styleUrls: ['./pie-especialidades-paciente.component.scss'],
})
export class PieEspecialidadesPacienteComponent implements OnInit, OnChanges {
    @ViewChild('chart') chart: ChartComponent;
    @Input() quantitativosPorTipoEspecializacao: IQuantitativosPorTipoProcedimentoModel[];
    public chartOptions: Partial<ChartOptions>;

    public chartPieConfig: any;

    constructor() {
        this.chartPieConfig = ChartPieConfig.configChartData;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.quantitativosPorTipoEspecializacao) {
            this.setDadosGraficoDeEspecialidades();
        }
    }

    ngOnInit(): void {}

    private setDadosGraficoDeEspecialidades(): void {
        this.chartPieConfig.labels = [];
        this.chartPieConfig.series = [];

        this.quantitativosPorTipoEspecializacao.forEach((value: any) => {
            this.chartPieConfig.labels.push(value.descricao);
            this.chartPieConfig.series.push(value.quantidade);
        });
    }
}

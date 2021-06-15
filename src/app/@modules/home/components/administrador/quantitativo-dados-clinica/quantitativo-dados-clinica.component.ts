import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { IConsultaMensalPorStatusModel } from '@app/models/dados-estastisticos-administrador';

@Component({
    selector: 'app-quantitativo-dados-clinica',
    templateUrl: './quantitativo-dados-clinica.component.html',
    styleUrls: ['./quantitativo-dados-clinica.component.scss'],
})
export class QuantitativoDadosClinicaComponent implements OnInit, OnChanges {
    @Input() consultaMensalPorStatus: IConsultaMensalPorStatusModel[];
    public loading = true;

    public pendente: any;
    public cancelada: any;
    public finalizada: any;
    public emAndamento: any;
    constructor() {}

    ngOnChanges(changes: SimpleChanges): void {
        if (this.consultaMensalPorStatus) {
            this.filterStatusGeralConsulta();
        }
    }

    ngOnInit(): void {
        setTimeout(() => (this.loading = false), 3000);
    }

    private filterStatusGeralConsulta(): void {
        this.pendente = this.consultaMensalPorStatus?.filter((v) => v.descricao === 'Pendente')[0];
        this.cancelada = this.consultaMensalPorStatus?.filter((v) => v.descricao === 'Cancelada')[0];
        this.finalizada = this.consultaMensalPorStatus?.filter((v) => v.descricao === 'Finalizada')[0];
        this.emAndamento = this.consultaMensalPorStatus?.filter((v) => v.descricao === 'Em Andamento')[0];
    }
}

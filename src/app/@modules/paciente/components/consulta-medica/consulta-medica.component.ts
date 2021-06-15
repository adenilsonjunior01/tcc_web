import { Component, OnInit } from '@angular/core';
import { NgSelectConfig } from '@ng-select/ng-select';
import { ListaUtilitarioMock } from '../../../../mocks/lista-utilitario-mock';
import { SweetalertService } from '../../../../@shared/sweetalert/sweetalert.service';

@Component({
    selector: 'app-consulta-medica',
    templateUrl: './consulta-medica.component.html',
    styleUrls: ['./consulta-medica.component.scss'],
})
export class ConsultaMedicaComponent implements OnInit {
    utilitariosMock = new ListaUtilitarioMock();
    listaSexo: any[];
    listaMedicos: any[];
    panelOpenState = false;
    medicoSelecionado: any;
    minDate: Date;
    maxDate: Date;

    constructor(private readonly _configNgSelect: NgSelectConfig, private readonly _toasty: SweetalertService) {
        this._configNgSelect.notFoundText = 'Nenhum registro encontrado';
        const currentYear = new Date().getFullYear();
        this.minDate = new Date(currentYear - 20, 0, 1);
        this.maxDate = new Date(currentYear + 1, 11, 31);
    }

    ngOnInit(): void {
        this.listaSexo = this.utilitariosMock.getListaSexos();
        this.listaMedicos = this.utilitariosMock.getMedicos();
    }

    public onSelectMedico(value: any): void {
        this.medicoSelecionado = value;
    }
}

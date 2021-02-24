import { Component, OnInit, ViewChild } from '@angular/core';
import { NgSelectConfig } from '@ng-select/ng-select';
import { ListaUtilitarioMock } from '../../../../mocks/lista-utilitario-mock';
import { SweetalertService } from '../../../../@shared/sweetalert/sweetalert.service';
import { QuoteService } from '../../../home/quote.service';

@Component({
  selector: 'app-consulta-medica',
  templateUrl: './consulta-medica.component.html',
  styleUrls: ['./consulta-medica.component.scss']
})

export class ConsultaMedicaComponent implements OnInit {
  utilitariosMock = new ListaUtilitarioMock();
  listaSexo: any[];
  listaMedicos: any[];
  panelOpenState = false;
  medicoSelecionado: any;

  constructor(
    private readonly _configNgSelect: NgSelectConfig,
    private readonly _toasty: SweetalertService,
    private readonly _quote: QuoteService
    ) {
    this._configNgSelect.notFoundText = 'Nenhum registro encontrado';
  }

  ngOnInit(): void {
    this.listaSexo = this.utilitariosMock.getListaSexos();
    this.listaMedicos = this.utilitariosMock.getMedicos();
  }

  public onSelectMedico(value: any): void {
    this.medicoSelecionado = value;
    console.log(value);
  }

  public abrir() {
    this._toasty.openToasty('Consulta agendada com sucesso!', 'success');
  }

  public testeRequestIntercptor() {
    this._quote.getRandomQuote({category: 'dev'}).subscribe(response => console.log(response));
  }
}

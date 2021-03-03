import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ListaUtilitarioMock } from '../../../../../mocks/lista-utilitario-mock';

@Component({
  selector: 'app-form-cadastro-colaborador',
  templateUrl: './form-cadastro-colaborador.component.html',
  styleUrls: ['./form-cadastro-colaborador.component.scss']
})
export class FormCadastroColaboradorComponent implements OnInit, OnChanges {
  @Input() type: any;

  private readonly utilitariosMock = new ListaUtilitarioMock();
  listaSexo: any[];
  listaPerfil: any[];
  listaEstados: any[];

  constructor() { }


  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.type.firstChange) {
      this.type = changes?.type.currentValue;
      console.log(this.type);
    }
  }

  ngOnInit(): void {
    this.listaSexo = this.utilitariosMock.getListaSexos();
    this.listaPerfil = this.utilitariosMock.getListaPerfil();
    this.listaEstados = this.utilitariosMock.getEstados();
  }

}

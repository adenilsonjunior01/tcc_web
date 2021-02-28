import { Component, Input, OnInit } from '@angular/core';
import { ListaUtilitarioMock } from '../../../../../mocks/lista-utilitario-mock';

@Component({
  selector: 'app-form-cadastro-colaborador',
  templateUrl: './form-cadastro-colaborador.component.html',
  styleUrls: ['./form-cadastro-colaborador.component.scss']
})
export class FormCadastroColaboradorComponent implements OnInit {
  @Input() type: any;

  private readonly utilitariosMock = new ListaUtilitarioMock();
  listaSexo: any[];
  listaPerfil: any[];
  listaEstados: any[];

  constructor() { }

  ngOnInit(): void {
    this.listaSexo = this.utilitariosMock.getListaSexos();
    this.listaPerfil = this.utilitariosMock.getListaPerfil();
    this.listaEstados = this.utilitariosMock.getEstados();
  }

}

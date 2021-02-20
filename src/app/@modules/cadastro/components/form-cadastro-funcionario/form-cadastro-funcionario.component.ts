import { Component, OnInit } from '@angular/core';
import { ListaUtilitarioMock } from '../../../../mocks/lista-utilitario-mock';

@Component({
  selector: 'app-form-cadastro-funcionario',
  templateUrl: './form-cadastro-funcionario.component.html',
  styleUrls: ['./form-cadastro-funcionario.component.scss']
})
export class FormCadastroFuncionarioComponent implements OnInit {

  utilitariosMock = new ListaUtilitarioMock();
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

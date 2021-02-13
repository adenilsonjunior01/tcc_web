import { Component, Input, OnInit } from '@angular/core';
import { ListaPacientesMock } from '../../../../mocks/lista-pacientes-mock';

@Component({
  selector: 'app-table-funcionario',
  templateUrl: './table-funcionario.component.html',
  styleUrls: ['./table-funcionario.component.scss']
})
export class TableFuncionarioComponent implements OnInit {
  private readonly listaPacientesMock = new ListaPacientesMock();
  pacientes: any[];

  constructor() { }

  ngOnInit(): void {
    this.getListaPacientes();
  }

  public verificaSexoUsuario(sexo: string): string {
    if (sexo == 'M')
      return './assets/profile/boy-1.svg'
    return './assets/profile/girl-1.svg'
  }

  public getListaPacientes(): void {
    this.pacientes = this.listaPacientesMock.listaPacientes();
  }
}

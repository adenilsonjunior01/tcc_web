import { Component, OnInit } from '@angular/core';
import { ListaPacientesMock } from '../../../../../mocks/lista-pacientes-mock';

@Component({
  selector: 'app-table-colaboradores',
  templateUrl: './table-colaboradores.component.html',
  styleUrls: ['./table-colaboradores.component.scss']
})
export class TableColaboradoresComponent implements OnInit {
  private readonly listaPacientesMock = new ListaPacientesMock();
  colaboradores: any[];

  constructor() { }

  ngOnInit(): void {
    this.getListaColaboradores();
  }

  public getListaColaboradores(): void {
    this.colaboradores = this.listaPacientesMock.listaPacientesMedico();
  }

  public verificaSexoUsuario(sexo: string): string {
    if (sexo == 'M')
      return './assets/profile/boy-1.svg'
    return './assets/profile/girl-1.svg'
  }

}

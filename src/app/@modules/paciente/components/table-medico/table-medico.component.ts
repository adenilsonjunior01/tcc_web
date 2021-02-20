import { Component, OnInit } from '@angular/core';
import { ListaPacientesMock } from '../../../../mocks/lista-pacientes-mock';

@Component({
  selector: 'app-table-medico',
  templateUrl: './table-medico.component.html',
  styleUrls: ['./table-medico.component.scss']
})
export class TableMedicoComponent implements OnInit {
  private readonly listaPacientesMock = new ListaPacientesMock();
  pacientes: any[];

  constructor() { }

  ngOnInit(): void {
    this.getListaPacientes();
  }

  public getListaPacientes(): void {
    this.pacientes = this.listaPacientesMock.listaPacientesMedico();
  }

  public verificaSexoUsuario(sexo: string): string {
    if (sexo == 'M')
      return './assets/profile/boy-1.svg'
    return './assets/profile/girl-1.svg'
  }
}

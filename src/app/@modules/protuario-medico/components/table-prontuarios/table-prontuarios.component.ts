import { Component, OnInit } from '@angular/core';
import { ListaPacientesMock } from '../../../../mocks/lista-pacientes-mock';

@Component({
  selector: 'app-table-prontuarios',
  templateUrl: './table-prontuarios.component.html',
  styleUrls: ['./table-prontuarios.component.scss'],
})
export class TableProntuariosComponent implements OnInit {
  private readonly listaPacientesMock = new ListaPacientesMock();
  especialidades: any[];
  public loading = false;

  constructor() {}

  ngOnInit(): void {
    this.getEspecialidades();
  }

  public getEspecialidades(): void {
    this.especialidades = this.listaPacientesMock.listaPacientesMedico();
  }
}

import { Component, OnInit } from '@angular/core';
import { ListaPacientesMock } from '../../../../mocks/lista-pacientes-mock';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-pacientes',
  templateUrl: './table-pacientes.component.html',
  styleUrls: ['./table-pacientes.component.scss'],
})
export class TablePacientesComponent implements OnInit {
  private readonly listaPacientesMock = new ListaPacientesMock();
  pacientes: any[];

  constructor(private readonly _router: Router) {}

  ngOnInit(): void {
    this.getListaPacientes();
  }

  public verificaSexoUsuario(sexo: string): string {
    if (sexo == 'M') return './assets/profile/boy-1.svg';
    return './assets/profile/girl-1.svg';
  }

  public getListaPacientes(): void {
    this.pacientes = this.listaPacientesMock.listaPacientes();
  }

  public openDetails(paciente: any): void {
    this._router.navigate(['/pacientes/detalhes'], { state: paciente });
  }
}

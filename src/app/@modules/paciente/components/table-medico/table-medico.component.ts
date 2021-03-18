import { Component, OnInit } from '@angular/core';
import { ListaPacientesMock } from '../../../../mocks/lista-pacientes-mock';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-medico',
  templateUrl: './table-medico.component.html',
  styleUrls: ['./table-medico.component.scss'],
})
export class TableMedicoComponent implements OnInit {
  private readonly listaPacientesMock = new ListaPacientesMock();
  pacientes: any[];

  constructor(private readonly _router: Router) {}

  ngOnInit(): void {
    this.getListaPacientes();
  }

  public getListaPacientes(): void {
    this.pacientes = this.listaPacientesMock.listaPacientesMedico();
  }

  public verificaSexoUsuario(sexo: string): string {
    if (sexo == 'M') return './assets/profile/boy-1.svg';
    return './assets/profile/girl-1.svg';
  }

  public confirmModal(paciente: any): void {
    Swal.fire({
      icon: 'info',
      title: 'Deseja continuar?',
      text: 'Ao continuar a consulta será iniciada.',
      showCancelButton: true,
      confirmButtonText: `Sim`,
      cancelButtonText: `Não`,
    }).then((result) => {
      if (result.isConfirmed) {
        this._router.navigate(['/pacientes/prontuario'], { state: paciente });
      }
    });
  }
}

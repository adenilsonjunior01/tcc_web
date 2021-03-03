import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalhes-paciente',
  templateUrl: './detalhes-paciente.component.html',
  styleUrls: ['./detalhes-paciente.component.scss']
})
export class DetalhesPacienteComponent implements OnInit {

  public dadosPaciente: any;

  constructor(private readonly _router: Router) {
    const state = this._router.getCurrentNavigation();
    if (state.extras.state) {
      this.setDadosPacienteLocalStorage(state.extras.state);
      this.dadosPaciente = state.extras.state;
    } else {
      this.dadosPaciente = this.getDadosPacienteLocalStorage();
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.removeDadosPacienteLocalStorage();
  }

  public backPage() {
    this._router.navigateByUrl('pacientes');
  }

  public setDadosPacienteLocalStorage(dados: any): void {
    localStorage.setItem('dadosPaciente', JSON.stringify(dados));
  }

  public getDadosPacienteLocalStorage(): any {
    return JSON.parse(localStorage.getItem('dadosPaciente'));
  }

  public removeDadosPacienteLocalStorage(): void {
    localStorage.removeItem('dadosPaciente');
  }

}

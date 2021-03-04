import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DadosPaciente } from '../../class/dados-paciente';

@Component({
  selector: 'app-detalhes-paciente',
  templateUrl: './detalhes-paciente.component.html',
  styleUrls: ['./detalhes-paciente.component.scss'],
})
export class DetalhesPacienteComponent implements OnInit {
  private readonly _dadosPaciente: any;

  public dadosPaciente: any;

  constructor(private readonly _router: Router) {
    this._dadosPaciente = new DadosPaciente();
    const state = this._router.getCurrentNavigation();
    if (state?.extras?.state) {
      this._dadosPaciente.setDadosPacienteLocalStorage(state.extras.state);
      this.dadosPaciente = state.extras.state;
    } else {
      this.dadosPaciente = this._dadosPaciente.getDadosPacienteLocalStorage();
    }
  }

  ngOnInit(): void {
    console.log(this.dadosPaciente);
  }

  ngOnDestroy(): void {
    this._dadosPaciente.removeDadosPacienteLocalStorage();
  }

  public backPage() {
    this._router.navigateByUrl('pacientes');
  }
}

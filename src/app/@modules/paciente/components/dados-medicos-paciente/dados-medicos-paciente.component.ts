import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DadosPaciente } from '../../class/dados-paciente';

@Component({
  selector: 'app-dados-medicos-paciente',
  templateUrl: './dados-medicos-paciente.component.html',
  styleUrls: ['./dados-medicos-paciente.component.scss'],
})
export class DadosMedicosPacienteComponent implements OnInit {
  private readonly _dadosMedicos = new DadosPaciente();

  public dadosMedicos: any;
  public dadosPaciente: any;
  public arquivos: any;
  step = 0;

  constructor(private readonly _router: Router) {
    const state = this._router.getCurrentNavigation();
    if (state?.extras?.state) {
      this._dadosMedicos.setDadosMedicosLocalStorage(state?.extras?.state?.consulta?.paciente?.dadosmedicos);
      this.dadosMedicos = state?.extras.state?.consulta?.paciente?.dadosmedicos;
      this.dadosPaciente = state?.extras?.state?.consulta?.paciente;
      this.arquivos = state?.extras?.state?.documentos;
    } else {
      const dados = JSON.parse(localStorage.getItem('__dadosMedico'));
      const dadosProntuario = JSON.parse(localStorage.getItem('__dadosProntuario'));
      this.dadosMedicos = dados;
      this.dadosPaciente = dados.consulta?.paciente;
      this.arquivos = dadosProntuario?.documentos;
    }

    console.log(this.dadosMedicos);
    console.log(this.dadosPaciente);
  }

  ngOnInit(): void {}

  public setStep(index: number) {
    this.step = index;
  }

  public nextStep() {
    this.step++;
  }

  public prevStep() {
    this.step--;
  }
}

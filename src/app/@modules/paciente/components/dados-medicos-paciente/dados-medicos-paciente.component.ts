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

  constructor() {
    const dados = JSON.parse(localStorage.getItem('__dadosMedico'));
    this.dadosMedicos = dados?.consulta?.paciente?.dadosmedicos;
    this.dadosPaciente = dados.consulta?.paciente;
    this.arquivos = dados?.documentos;
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

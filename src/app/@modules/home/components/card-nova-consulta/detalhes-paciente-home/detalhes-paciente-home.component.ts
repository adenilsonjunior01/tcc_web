import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalhes-paciente-home',
  templateUrl: './detalhes-paciente-home.component.html',
  styleUrls: ['./detalhes-paciente-home.component.scss']
})
export class DetalhesPacienteHomeComponent implements OnInit {
  @Input() paciente: any;

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-novo-paciente',
  templateUrl: './card-novo-paciente.component.html',
  styleUrls: ['./card-novo-paciente.component.scss'],
})
export class CardNovoPacienteComponent implements OnInit {
  constructor(private readonly _router: Router) {}

  ngOnInit(): void {}

  public redirectToRegisterPaciente(): void {
    this._router.navigateByUrl('/pacientes');
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { IPacienteModel } from '../../../../../models/paciente-model';

@Component({
    selector: 'app-detalhes-paciente-home',
    templateUrl: './detalhes-paciente-home.component.html',
    styleUrls: ['./detalhes-paciente-home.component.scss'],
})
export class DetalhesPacienteHomeComponent implements OnInit {
    @Input() paciente: IPacienteModel;

    constructor() {}

    ngOnInit(): void {}
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalAnimationComponent } from '../../../../@shared/modal-animation/modal-animation.component';
import { IUsuarioModel } from '../../../../models/usuario-model';

@Component({
    selector: 'app-card-novo-paciente',
    templateUrl: './card-novo-paciente.component.html',
    styleUrls: ['./card-novo-paciente.component.scss'],
})
export class CardNovoPacienteComponent implements OnInit {
    @ViewChild(ModalAnimationComponent) modal: any;
    public dadosPaciente: IUsuarioModel;
    constructor(private readonly _router: Router) {}

    ngOnInit(): void {}

    public redirectToRegisterPaciente(): void {
        this._router.navigateByUrl('/pacientes');
    }

    public closeModal(event: any) {
        if (event.close) {
            this.modal.close(event.id);
        }
    }

    public getDadosPaciente(event: IUsuarioModel, idModal: string): void {
        this.dadosPaciente = event;
        this.modal.close('pre-cadastro');
        setTimeout(() => this.modal.show(idModal), 600);
    }
}

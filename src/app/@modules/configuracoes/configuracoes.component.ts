import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalAnimationComponent } from '@app/@shared/modal-animation/modal-animation.component';
import { ClinicaService } from '../../services/clinica/clinica.service';
import { Logger } from '../../@core/logger.service';

const log = new Logger('Configurações Clínica');

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.scss'],
})
export class ConfiguracoesComponent implements OnInit {
  @ViewChild(ModalAnimationComponent) modal: any;
  public detailsProfile = { teste: 'Teste' };
  public dadosClinica: any;

  /**
   * @description: Type 1: Edição de Logo, Type 2: edição História, Type 3: edição missão, valores, visão
   */
  public type: number;

  constructor(private readonly _clinicaService: ClinicaService) {}

  ngOnInit(): void {
    this.getDadosClinica();
  }

  public openModal(type: number, idModal: string): void {
    this.type = type;
    this.modal.show(idModal);
  }

  public getDadosClinica(): void {
    this._clinicaService.getDadosClinica().subscribe({
      next: (body: any) => {
        this.dadosClinica = body;
      },
      error: (error: any) => {
        log.error(error);
      },
    });
  }
}

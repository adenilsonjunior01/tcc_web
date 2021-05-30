import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalAnimationComponent } from '../../@shared/modal-animation/modal-animation.component';

@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.scss'],
})
export class EspecialidadesComponent implements OnInit {
  @ViewChild(ModalAnimationComponent) modal: any;
  public recarregarLista: boolean;

  constructor() {}

  ngOnInit(): void {}

  public closeModal(event: boolean): void {
    this.modal.close('especialidade');
    this.recarregarLista = event;
  }
}

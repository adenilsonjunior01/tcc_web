import { Component, Input, OnInit, OnDestroy, ViewChild, EventEmitter, Output } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { UtilitariosService } from '@app/services/utilitarios/utilitarios.service';

@Component({
  selector: 'app-detalhes-prontuario',
  templateUrl: './detalhes-prontuario.component.html',
  styleUrls: ['./detalhes-prontuario.component.scss'],
})
export class DetalhesProntuarioComponent implements OnInit, OnDestroy {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  @Input() prontuario: any;
  @Output() closeModal = new EventEmitter();
  public step: number;
  public loadingDownload = false;

  constructor(private readonly _utilitariosService: UtilitariosService) {}

  ngOnDestroy(): void {}

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

  public downloadFile(urlDownload: string): void {
    this._utilitariosService.downloadFile(urlDownload);
  }

  public downloadFile2(urlDownload: string): void {
    this._utilitariosService.download(urlDownload);
  }

  public close(idModal: string) {
    this.closeModal.emit(idModal);
  }
}

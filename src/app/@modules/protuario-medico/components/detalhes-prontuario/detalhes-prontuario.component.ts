import { Component, Input, OnInit, OnDestroy, ViewChild, EventEmitter, Output } from '@angular/core';
import { UtilitariosService } from '@app/services/utilitarios/utilitarios.service';
import { untilDestroyed } from '../../../../@core/until-destroyed';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-detalhes-prontuario',
  templateUrl: './detalhes-prontuario.component.html',
  styleUrls: ['./detalhes-prontuario.component.scss'],
})
export class DetalhesProntuarioComponent implements OnInit, OnDestroy {
  @Input() prontuario: any;
  @Output() closeModal = new EventEmitter();
  public step = 0;
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

  public downloadAnexo(idAnexo: number, formato: string): void {
    this.loadingDownload = true;
    this._utilitariosService
      .downloadAnexo(idAnexo, formato)
      .pipe(
        untilDestroyed(this),
        finalize(() => (this.loadingDownload = false))
      )
      .subscribe({
        next: (body: any) => {
          console.log(body);
          this.download(body, formato);
        },
      });
  }

  public download(resp: any, formato: any) {
    const file = new Blob([resp], { type: resp.type });

    // IE
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(file);
      return;
    }

    const blob = window.URL.createObjectURL(file);

    const link = document.createElement('a');
    link.href = blob;
    link.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    );

    // firefox
    setTimeout(() => {
      window.URL.revokeObjectURL(blob);
      link.remove();
    }, 200);
  }

  public close(idModal: string) {
    this.closeModal.emit(idModal);
  }
}

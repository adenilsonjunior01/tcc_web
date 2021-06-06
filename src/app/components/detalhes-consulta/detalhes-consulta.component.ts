import { Component, OnInit, Input, AfterViewInit, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-detalhes-consulta',
  templateUrl: './detalhes-consulta.component.html',
  styleUrls: ['./detalhes-consulta.component.scss'],
})
export class DetalhesConsultaComponent implements OnInit, OnChanges {
  @Input() consulta: any;
  @Output() closeModal = new EventEmitter();

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {}

  public emitEventCloseModal(): void {
    this.closeModal.emit({ close: true, modalId: 'detalhe-consulta' });
  }
}

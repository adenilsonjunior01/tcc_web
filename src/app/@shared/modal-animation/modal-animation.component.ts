import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal-animation',
  templateUrl: './modal-animation.component.html',
  styleUrls: ['./modal-animation.component.scss'],
})
export class ModalAnimationComponent implements OnInit {
  @Input() modalClass: string;
  @Input() contentClass: string;
  @Input() modalID: string;
  @Input() backDrop = false;
  public visible = false;
  public visibleAnimate = false;

  constructor() {}

  ngOnInit() {}

  public show(id?: any): void {
    this.visible = true;
    setTimeout(() => (this.visibleAnimate = true), 100);
    if (id) {
      document.querySelector(`#${id}`).classList.add('md-show');
    } else {
      document.querySelector(`#${this.modalID}`).classList.add('md-show');
    }
  }

  public close(id?: any) {
    if (id) {
      document.querySelector(`#${id}`).classList.remove('md-show');
    } else {
      document.querySelector(`#${this.modalID}`).classList.remove('md-show');
    }
  }
}

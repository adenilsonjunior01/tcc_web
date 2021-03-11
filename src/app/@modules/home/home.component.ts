import { Component, OnInit, ViewChild } from '@angular/core';

import { QuoteService } from './quote.service';
import { ModalAnimationComponent } from '../../@shared/modal-animation/modal-animation.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild(ModalAnimationComponent) modal: any;
  quote: string | undefined;
  isLoading = false;

  constructor(private quoteService: QuoteService) {}

  ngOnInit() {
    this.isLoading = true;
  }

  public openModal(id: string) {
    this.modal.show(id);
  }
}

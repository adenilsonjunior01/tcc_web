import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-card-content',
    templateUrl: './card-content.component.html',
    styleUrls: ['./card-content.component.scss'],
})
export class CardContentComponent implements OnInit {
    @Input() cardClass: string;
    @Input() isCardFooter: boolean;
    @Input() footerClass: string;
    @Input() loadingLine: boolean;
    @Input() progressClass: string;
    @Input() isHeader: boolean;

    constructor() {}

    ngOnInit(): void {}
}

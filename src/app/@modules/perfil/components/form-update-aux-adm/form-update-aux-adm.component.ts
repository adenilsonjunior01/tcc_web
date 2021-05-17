import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-update-aux-adm',
  templateUrl: './form-update-aux-adm.component.html',
  styleUrls: ['./form-update-aux-adm.component.scss'],
})
export class FormUpdateAuxAdmComponent implements OnInit {
  @Input() dadosUser: any;

  constructor() {}

  ngOnInit(): void {}
}

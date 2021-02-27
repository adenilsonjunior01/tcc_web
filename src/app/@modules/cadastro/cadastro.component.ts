import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  radioForm = new FormControl();

  constructor() { }

  ngOnInit(): void {
    this.radioForm.setValue('1');
  }

  public selectForm() {

  }

}

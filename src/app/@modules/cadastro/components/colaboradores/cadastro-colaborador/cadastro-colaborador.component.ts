import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cadastro-colaborador',
  templateUrl: './cadastro-colaborador.component.html',
  styleUrls: ['./cadastro-colaborador.component.scss']
})
export class CadastroColaboradorComponent implements OnInit {
  radioForm = new FormControl();
  dialog = new DialogContent(this._dialog);

  constructor(private readonly _dialog?: MatDialog) { }

  ngOnInit(): void {
    this.radioForm.setValue('1');
  }

  closeDialog() {
    this.dialog.closeDialog();
  }

}

export class DialogContent {
  constructor(public dialog?: MatDialog) {}

  closeDialog() {
    this.dialog.closeAll();
  }
}

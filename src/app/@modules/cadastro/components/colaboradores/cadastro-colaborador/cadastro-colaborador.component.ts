import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cadastro-colaborador',
  templateUrl: './cadastro-colaborador.component.html',
  styleUrls: ['./cadastro-colaborador.component.scss']
})
export class CadastroColaboradorComponent implements OnInit {
  public radioForm = new FormControl();
  public dialog = new DialogContent(this._dialog);
  public dadosColaborador: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataDialog: any,
    private readonly _dialog?: MatDialog) { }

  ngOnInit(): void {
    this.isUpdate();
    this.verifyProfile();
    this.radioForm.setValue('1');
  }

  private isUpdate() {
    if (this.dataDialog?.update) {
      this.dadosColaborador = this.dataDialog;
    }
  }

  private verifyProfile() {
    if (this.dataDialog?.perfil.toLowerCase() === 'assistente')
      this.radioForm.setValue('2');
    this.radioForm.setValue('1');
  }

  public verifyAction(): void {
    if (!this.dataDialog?.update)
      this.save();
    this.update();
  }

  public save(): void {
    console.log('SAVE');
  }

  public update(): void {
    console.log('UPDATE');
  }

  public closeDialog(): void {
    this.dialog.closeDialog();
  }

}

export class DialogContent {
  constructor(public dialog?: MatDialog) {}

  closeDialog() {
    this.dialog.closeAll();
  }
}

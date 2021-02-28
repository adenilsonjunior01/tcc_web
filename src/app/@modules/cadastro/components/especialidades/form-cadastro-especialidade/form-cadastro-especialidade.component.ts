import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-cadastro-especialidade',
  templateUrl: './form-cadastro-especialidade.component.html',
  styleUrls: ['./form-cadastro-especialidade.component.scss']
})
export class FormCadastroEspecialidadeComponent implements OnInit {

  public form: FormGroup
  ;
  dialog = new DialogContent(this._dialog);

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataDialog: any,
    private readonly _dialog?: MatDialog
    ) { }

  ngOnInit(): void {
    console.log('DADOS DIALOG>> ', this.dataDialog);
  }

  public initForm() {

  }

  public closeDialog() {
    this.dialog.closeDialog();
  }

  /**
   * @description: Verifica se é uma nova Especialidade ou atualização e se o
   * form é válido
   */
  public verifyFormSubmit() {
    if (this.form.get('id').value === null && this.form.valid)
      this.save()
    this.update();
  }

  private save() {

  }

  private update() {

  }

}

export class DialogContent {
  constructor(public dialog?: MatDialog) {}

  closeDialog() {
    this.dialog.closeAll();
  }
}

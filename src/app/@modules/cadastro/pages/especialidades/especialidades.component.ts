import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormCadastroEspecialidadeComponent } from '../../components/especialidades/form-cadastro-especialidade/form-cadastro-especialidade.component';

@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.scss'],
})
export class EspecialidadesComponent implements OnInit {
  dialog = new DialogContent(this._dialog);

  constructor(private readonly _dialog?: MatDialog) {}

  ngOnInit(): void {}

  openDialog() {
    this.dialog.openDialog();
  }
}

export class DialogContent {
  constructor(public dialog?: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(FormCadastroEspecialidadeComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

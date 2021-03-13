import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormDadosClinicaComponent } from './components/form-dados-clinica/form-dados-clinica.component';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.scss'],
})
export class ConfiguracoesComponent implements OnInit {
  public dialog = new DialogContent(this._dialog);
  public detailsProfile = { teste: 'Teste' };

  constructor(private readonly _dialog?: MatDialog) {}

  ngOnInit(): void {}

  /**
   * @description: Type 1: Edição de Logo, Type 2: edição História, Type 3: edição missão, valores, visão
   */
  openDialog(type: any) {
    const valuesSubmit = Object.assign(this.detailsProfile, {
      type,
    });
    this.dialog.openDialog(valuesSubmit);
  }
}

export class DialogContent {
  constructor(public dialog?: MatDialog) {}

  openDialog(values: any) {
    const dialogRef = this.dialog.open(FormDadosClinicaComponent, {
      data: values,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

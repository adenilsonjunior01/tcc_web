import { Component, OnInit } from '@angular/core';
import { ListaUtilitarioMock } from '../../mocks/lista-utilitario-mock';
import { MatDialog } from '@angular/material/dialog';
import { CadastroColaboradorComponent } from './components/colaboradores/cadastro-colaborador/cadastro-colaborador.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {
  utilitariosMock = new ListaUtilitarioMock();
  listaSexo: any[];
  listaStatus: any[];

  dialog = new DialogContent(this._dialog);

  constructor(private readonly _dialog?: MatDialog) {}

  ngOnInit(): void {
    this.listaSexo = this.utilitariosMock.getListaSexos();
    this.listaStatus = this.utilitariosMock.getListaStatus();
  }

  openDialog() {
    this.dialog.openDialog();
  }
}

export class DialogContent {
  constructor(public dialog?: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(CadastroColaboradorComponent);

    dialogRef.afterClosed().subscribe((result) => {});
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListaPacientesMock } from '../../../../../mocks/lista-pacientes-mock';
import { MatDialog } from '@angular/material/dialog';
import { CadastroColaboradorComponent } from '../cadastro-colaborador/cadastro-colaborador.component';

@Component({
  selector: 'app-table-colaboradores',
  templateUrl: './table-colaboradores.component.html',
  styleUrls: ['./table-colaboradores.component.scss'],
})
export class TableColaboradoresComponent implements OnInit {
  private readonly listaPacientesMock = new ListaPacientesMock();
  public colaboradores: any[];

  public dialog = new DialogContent(this._dialog);

  constructor(private readonly _router: Router, private readonly _dialog?: MatDialog) {}

  ngOnInit(): void {
    this.getListaColaboradores();
  }

  public getListaColaboradores(): void {
    this.colaboradores = this.listaPacientesMock.listaPacientesMedico();
  }

  public verificaSexoUsuario(sexo: string): string {
    if (sexo == 'M') return './assets/profile/boy-1.svg';
    return './assets/profile/girl-1.svg';
  }

  public redirectPageDatail(colaborador: any): void {
    this._router.navigate(['/cadastro/colaborador/detalhes'], { state: colaborador });
  }

  /**
   * @param colaborador: recebe os dados do colaborador e envia pro Componente CadastroColaboradorComponent
   */
  public openDialog(colaborador: any) {
    const valuesSubmit = Object.assign(colaborador, {
      update: true,
    });
    console.log(valuesSubmit);
    this.dialog.openDialog(valuesSubmit);
  }
}

export class DialogContent {
  constructor(public dialog?: MatDialog) {}

  openDialog(obj: any) {
    const dialogRef = this.dialog.open(CadastroColaboradorComponent, {
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

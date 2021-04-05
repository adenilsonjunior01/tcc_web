import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ListaPacientesMock } from '../../../../../mocks/lista-pacientes-mock';
import { MatDialog } from '@angular/material/dialog';
import { CadastroColaboradorComponent } from '../cadastro-colaborador/cadastro-colaborador.component';
import { ColaboradoresService } from '../../../../../services/colaboradores/colaboradores.service';
import { untilDestroyed } from '../../../../../@core/until-destroyed';
import { finalize } from 'rxjs/operators';
import { Logger } from '../../../../../@core/logger.service';

const log = new Logger('Tabela Colaboradores');

@Component({
  selector: 'app-table-colaboradores',
  templateUrl: './table-colaboradores.component.html',
  styleUrls: ['./table-colaboradores.component.scss'],
})
export class TableColaboradoresComponent implements OnInit, OnDestroy {
  private readonly listaPacientesMock = new ListaPacientesMock();
  public colaboradores: any[];
  loading = false;

  public dialog = new DialogContent(this._dialog);

  constructor(
    private readonly _router: Router,
    private readonly _colaboradoresService: ColaboradoresService,
    private readonly _dialog?: MatDialog
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.getListaColaboradores();
    this.getTodosColaboradores();
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

  public getTodosColaboradores(): void {
    this.loading = true;
    this._colaboradoresService
      .getAllColaboradores()
      .pipe(
        untilDestroyed(this),
        finalize(() => (this.loading = false))
      )
      .subscribe({
        next: (colaboradores) => {
          this.colaboradores = colaboradores;
        },
        error: (err) => {
          log.error(err);
        },
      });
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

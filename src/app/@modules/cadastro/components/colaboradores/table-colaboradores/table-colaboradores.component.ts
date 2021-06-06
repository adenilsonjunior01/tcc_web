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
  itemsPerPage = 5;
  currentPage: number;
  totalItems: number;
  page = 0;

  public dialog = new DialogContent(this._dialog);

  constructor(
    private readonly _router: Router,
    private readonly _colaboradoresService: ColaboradoresService,
    private readonly _dialog?: MatDialog
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    // this.getListaColaboradores();
    this.getAllColaboradores();
  }

  public getListaColaboradores(): void {
    this.colaboradores = this.listaPacientesMock.listaPacientesMedico();
  }

  public verificaSexoUsuario(sexo: string): string {
    if (sexo.toUpperCase() == 'M') return './assets/profile/boy-1.svg';
    return './assets/profile/girl-1.svg';
  }

  public redirectPageDatail(colaborador: any): void {
    this._router.navigate(['/cadastro/colaborador/detalhes'], { state: colaborador });
  }

  public getAllColaboradores(page = 0): void {
    this.loading = true;
    this.colaboradores = [];
    this._colaboradoresService
      .getAllColaboradores(page, this.itemsPerPage)
      .pipe(
        untilDestroyed(this),
        finalize(() => (this.loading = false))
      )
      .subscribe({
        next: (body: any) => {
          this.colaboradores = body.content;
          this.page = page + 1;
          this.totalItems = body.totalElements;
        },
        error: (err) => {
          log.error(err);
        },
      });
  }

  public pageChanged(event: number): void {
    this.getAllColaboradores(event - 1);
    this.page = event;
  }

  /**
   * @param colaborador: recebe os dados do colaborador e envia pro Componente CadastroColaboradorComponent
   */
  public openDialog(colaborador: any) {
    const valuesSubmit = Object.assign(colaborador, {
      update: true,
    });
    this.dialog.openDialog(valuesSubmit);
  }
}

export class DialogContent {
  constructor(public dialog?: MatDialog) {}

  openDialog(obj: any) {
    const dialogRef = this.dialog.open(CadastroColaboradorComponent, {
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}

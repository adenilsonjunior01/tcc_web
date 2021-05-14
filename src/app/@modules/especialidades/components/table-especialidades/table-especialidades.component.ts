import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { ModalAnimationComponent } from '@app/@shared/modal-animation/modal-animation.component';
import { ListaPacientesMock } from '../../../../mocks/lista-pacientes-mock';
import { IEspecializacaoModel } from '../../../../models/especializacao-model';
import { UtilitariosService } from '../../../../services/utilitarios/utilitarios.service';
import { untilDestroyed } from '../../../../@core/until-destroyed';
import { FormCadastroEspecialidadeComponent } from '../form-cadastro-especialidade/form-cadastro-especialidade.component';

@Component({
  selector: 'app-table-especialidades',
  templateUrl: './table-especialidades.component.html',
  styleUrls: ['./table-especialidades.component.scss'],
})
export class TableEspecialidadesComponent implements OnInit, OnDestroy {
  @ViewChild(ModalAnimationComponent) modal: any;
  private readonly listaPacientesMock = new ListaPacientesMock();
  especialidades: IEspecializacaoModel[] = [];
  dialog = new DialogContent(this._dialog);
  public loading = false;

  constructor(private readonly _dialog?: MatDialog, private readonly _especialidades?: UtilitariosService) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.getEspecialidades();
  }

  public getEspecialidades(): void {
    this._especialidades
      .getEspecializacoes()
      .pipe(
        untilDestroyed(this),
        finalize(() => (this.loading = false))
      )
      .subscribe({
        next: (body: IEspecializacaoModel[]) => {
          this.especialidades = body;
        },
      });
  }

  public openDialog(values: any): void {
    this.dialog.openDialog(values);
  }

  // SE FOR DESATIVAR, O TEXTO MUDARÁ INFORMANDO O USUÁRIO QUE ELE PODE REATIVAR
  public confirmModal() {
    Swal.fire({
      icon: 'info',
      title: 'Deseja continuar?',
      text: 'Esta ação não poderá ser revertida.',
      showCancelButton: true,
      confirmButtonText: `Sim`,
      cancelButtonText: `Não`,
    }).then((result) => {
      // CHAMAR END-POINT DE EXCLUSÃO
      if (result.isConfirmed) {
        this.sweetAlertConfirm();
      }
    });
  }

  private sweetAlertConfirm(): void {
    Swal.fire('Item deletado com sucesso!', '', 'success');
  }
}

export class DialogContent {
  constructor(public dialog?: MatDialog) {}

  openDialog(values: any) {
    const dialogRef = this.dialog.open(FormCadastroEspecialidadeComponent, {
      data: values,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

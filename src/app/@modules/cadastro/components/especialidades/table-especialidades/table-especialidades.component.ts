import { Component, OnInit } from '@angular/core';
import { ListaPacientesMock } from '../../../../../mocks/lista-pacientes-mock';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { FormCadastroEspecialidadeComponent } from '../form-cadastro-especialidade/form-cadastro-especialidade.component';

@Component({
  selector: 'app-table-especialidades',
  templateUrl: './table-especialidades.component.html',
  styleUrls: ['./table-especialidades.component.scss']
})
export class TableEspecialidadesComponent implements OnInit {
  private readonly listaPacientesMock = new ListaPacientesMock();
  especialidades: any[];
  dialog = new DialogContent(this._dialog);

  constructor(private readonly _dialog?: MatDialog) { }

  ngOnInit(): void {
    this.getEspecialidades();
  }

  public getEspecialidades(): void {
    this.especialidades = this.listaPacientesMock.listaPacientesMedico();
  }

  public openDialog(values: any): void {
    this.dialog.openDialog(values);

  }

  public confirmModal() {
    Swal.fire({
      title: 'Esta ação não poderá ser revertida, quer continuar?',
      showCancelButton: true,
      confirmButtonText: `Sim`,
      cancelButtonText: `Não`
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
      data: values
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

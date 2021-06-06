import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConsultaMedicaComponent } from './components/consulta-medica/consulta-medica.component';
import { CredentialsService } from '../../auth/credentials.service';
import { PacienteService } from '@app/services/paciente/paciente.service';
import { untilDestroyed } from '../../@core/until-destroyed';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss'],
})
export class PacienteComponent implements OnInit, OnDestroy {
  pacientes: any[] = [];
  perfil: string;
  public search = new FormControl();
  reload: boolean;

  dialog = new DialogContent(this._dialog);

  constructor(
    private readonly _dialog?: MatDialog,
    private readonly _credentials?: CredentialsService,
    private readonly _pacienteService?: PacienteService
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.getPerfilUser();
  }

  openDialog() {
    this.dialog.openDialog();
  }

  public getPerfilUser() {
    this.perfil = this._credentials.profile;
  }

  public getPacientePorNome(name: string): void {
    this.pacientes = [];
    if (name !== '') {
      this.reload = false;
      this._pacienteService
        .getPaciente(name)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: (body: any) => {
            this.pacientes = body;
          },
          error: (error) => {},
        });
    } else {
      this.reload = true;
    }
  }
}

export class DialogContent {
  constructor(public dialog?: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(ConsultaMedicaComponent);

    dialogRef.afterClosed().subscribe((result) => {});
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConsultaMedicaComponent } from './components/consulta-medica/consulta-medica.component';
import { CredentialsService } from '../../auth/credentials.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss'],
})
export class PacienteComponent implements OnInit {
  pacientes: any[] = [];
  perfil: string;

  dialog = new DialogContent(this._dialog);

  constructor(private readonly _dialog?: MatDialog, private readonly _credentials?: CredentialsService) {}

  ngOnInit(): void {
    this.getPerfilUser();
  }

  openDialog() {
    this.dialog.openDialog();
  }

  public getPerfilUser() {
    this.perfil = this._credentials.profile;
  }
}

export class DialogContent {
  constructor(public dialog?: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(ConsultaMedicaComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

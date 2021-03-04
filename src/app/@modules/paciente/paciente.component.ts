import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConsultaMedicaComponent } from './components/consulta-medica/consulta-medica.component';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss'],
})
export class PacienteComponent implements OnInit {
  pacientes: any[] = [];

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
    const dialogRef = this.dialog.open(ConsultaMedicaComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

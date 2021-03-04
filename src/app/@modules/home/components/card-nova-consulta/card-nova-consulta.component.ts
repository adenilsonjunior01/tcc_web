import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConsultaMedicaComponent } from '../../../paciente/components/consulta-medica/consulta-medica.component';

@Component({
  selector: 'app-card-nova-consulta',
  templateUrl: './card-nova-consulta.component.html',
  styleUrls: ['./card-nova-consulta.component.scss'],
})
export class CardNovaConsultaComponent implements OnInit {
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

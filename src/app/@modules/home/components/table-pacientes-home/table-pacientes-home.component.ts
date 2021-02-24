import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-pacientes-home',
  templateUrl: './table-pacientes-home.component.html',
  styleUrls: ['./table-pacientes-home.component.scss']
})
export class TablePacientesHomeComponent implements OnInit {

  constructor() { }

  date: any;

  ngOnInit(): void {
    this.date = new Date().toString()
  }

}

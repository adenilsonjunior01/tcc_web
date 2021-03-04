import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-consultas-home',
  templateUrl: './table-consultas-home.component.html',
  styleUrls: ['./table-consultas-home.component.scss'],
})
export class TableConsultasHomeComponent implements OnInit {
  constructor() {}

  date: any;

  ngOnInit(): void {
    this.date = new Date().toString();
  }
}

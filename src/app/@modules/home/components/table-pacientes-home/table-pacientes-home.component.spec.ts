import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePacientesHomeComponent } from './table-pacientes-home.component';

describe('TablePacientesHomeComponent', () => {
  let component: TablePacientesHomeComponent;
  let fixture: ComponentFixture<TablePacientesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablePacientesHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePacientesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

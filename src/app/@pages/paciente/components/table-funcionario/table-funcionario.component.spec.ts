import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFuncionarioComponent } from './table-funcionario.component';

describe('TableFuncionarioComponent', () => {
  let component: TableFuncionarioComponent;
  let fixture: ComponentFixture<TableFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableFuncionarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

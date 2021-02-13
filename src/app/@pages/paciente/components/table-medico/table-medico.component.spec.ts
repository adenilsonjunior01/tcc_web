import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMedicoComponent } from './table-medico.component';

describe('TableMedicoComponent', () => {
  let component: TableMedicoComponent;
  let fixture: ComponentFixture<TableMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableMedicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

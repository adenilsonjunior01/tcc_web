import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableColaboradoresComponent } from './table-colaboradores.component';

describe('TableColaboradoresComponent', () => {
  let component: TableColaboradoresComponent;
  let fixture: ComponentFixture<TableColaboradoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableColaboradoresComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableColaboradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

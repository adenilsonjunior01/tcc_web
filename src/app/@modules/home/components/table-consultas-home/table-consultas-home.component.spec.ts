import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableConsultasHomeComponent } from './table-consultas-home.component';

describe('TableConsultasHomeComponent', () => {
  let component: TableConsultasHomeComponent;
  let fixture: ComponentFixture<TableConsultasHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableConsultasHomeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableConsultasHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

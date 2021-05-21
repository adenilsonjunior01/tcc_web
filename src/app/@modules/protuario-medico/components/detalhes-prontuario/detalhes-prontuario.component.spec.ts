import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesProntuarioComponent } from './detalhes-prontuario.component';

describe('DetalhesProntuarioComponent', () => {
  let component: DetalhesProntuarioComponent;
  let fixture: ComponentFixture<DetalhesProntuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalhesProntuarioComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesProntuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

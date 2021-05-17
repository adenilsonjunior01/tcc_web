import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateAuxAdmComponent } from './form-update-aux-adm.component';

describe('FormUpdateAuxAdmComponent', () => {
  let component: FormUpdateAuxAdmComponent;
  let fixture: ComponentFixture<FormUpdateAuxAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormUpdateAuxAdmComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUpdateAuxAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

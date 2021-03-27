import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabSenhaComponent } from './tab-senha.component';

describe('TabSenhaComponent', () => {
  let component: TabSenhaComponent;
  let fixture: ComponentFixture<TabSenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabSenhaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

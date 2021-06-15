import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateMedicoComponent } from './form-update-medico.component';

describe('FormUpdateMedicoComponent', () => {
    let component: FormUpdateMedicoComponent;
    let fixture: ComponentFixture<FormUpdateMedicoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FormUpdateMedicoComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FormUpdateMedicoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

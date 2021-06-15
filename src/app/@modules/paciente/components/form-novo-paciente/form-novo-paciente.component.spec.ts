import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNovoPacienteComponent } from './form-novo-paciente.component';

describe('FormNovoPacienteComponent', () => {
    let component: FormNovoPacienteComponent;
    let fixture: ComponentFixture<FormNovoPacienteComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FormNovoPacienteComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FormNovoPacienteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

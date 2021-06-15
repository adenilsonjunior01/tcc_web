import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPreCadastroPacienteComponent } from './form-pre-cadastro-paciente.component';

describe('FormPreCadastroPacienteComponent', () => {
    let component: FormPreCadastroPacienteComponent;
    let fixture: ComponentFixture<FormPreCadastroPacienteComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FormPreCadastroPacienteComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FormPreCadastroPacienteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

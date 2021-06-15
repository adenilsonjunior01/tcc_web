import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosMedicosPacienteComponent } from './dados-medicos-paciente.component';

describe('DadosMedicosPacienteComponent', () => {
    let component: DadosMedicosPacienteComponent;
    let fixture: ComponentFixture<DadosMedicosPacienteComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DadosMedicosPacienteComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DadosMedicosPacienteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
